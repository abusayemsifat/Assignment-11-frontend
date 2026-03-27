// src/Pages/Dashboard/MainDashboard/MainDashboard.jsx
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import useCountUp from '../../../hooks/useCountUp';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const statusColors = {
  pending:    { bg:'rgba(255,179,63,0.12)', color:'#FFB33F', dot:'#FFB33F' },
  inprogress: { bg:'rgba(19,78,142,0.12)',  color:'#134E8E', dot:'#134E8E' },
  done:       { bg:'rgba(22,101,52,0.12)',  color:'#16a34a', dot:'#16a34a' },
  cancelled:  { bg:'rgba(100,100,100,0.1)', color:'#888',    dot:'#888'    },
};
const BLOOD_COLORS = ['#C00707','#FF4400','#134E8E','#0d3d70','#166534','#14532d','#6b21a8','#4a044e'];
const PIE_COLORS   = ['#C00707','#134E8E','#16a34a','#888'];

const CSS = `
  @keyframes db-fade-up { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes db-pop { 0%{opacity:0;transform:scale(0.82) translateY(8px)} 70%{transform:scale(1.04)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes db-shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 0 currentColor} 50%{box-shadow:0 0 0 5px transparent} }
  @keyframes slide-row { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
  .db-welcome { animation:db-fade-up 0.55s ease 0.1s both }
  .db-stat-card {
    animation:db-pop 0.5s cubic-bezier(.34,1.56,.64,1) both;
    border-radius:18px; padding:24px 20px; border:1px solid var(--border);
    background:var(--bg-subtle); position:relative; overflow:hidden;
    transition:transform 0.22s cubic-bezier(.34,1.56,.64,1),box-shadow 0.22s ease;
  }
  .db-stat-card:hover { transform:translateY(-5px) scale(1.02); box-shadow:0 16px 40px rgba(0,0,0,0.18) }
  .db-stat-card::after { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent) }
  .db-stat-card:hover::after { left:150%; transition:left 0.55s ease }
  .chart-card {
    background:var(--bg-subtle); border:1px solid var(--border); border-radius:18px; padding:24px;
    transition:box-shadow 0.22s ease;
  }
  .chart-card:hover { box-shadow:0 8px 32px rgba(0,0,0,0.12) }
  .db-section { animation:db-fade-up 0.55s ease both }
  .db-row { animation:slide-row 0.4s ease both }
  .status-dot { width:8px; height:8px; border-radius:50%; animation:pulse-dot 1.8s ease infinite }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:10, padding:'10px 14px', fontFamily:FB, fontSize:12 }}>
      <p style={{ fontFamily:FD, fontWeight:700, color:'var(--text-primary)', margin:'0 0 4px' }}>{label}</p>
      {payload.map((p,i) => <p key={i} style={{ color:p.color, margin:0 }}>{p.name}: <strong>{p.value}</strong></p>)}
    </div>
  );
};

const StatCard = ({ icon, label, target, color, suffix='', delay='0ms' }) => {
  const [ref, display] = useCountUp(target, 1600, suffix);
  return (
    <div ref={ref} className="db-stat-card" style={{ animationDelay:delay }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${color},${color}88)`, borderRadius:'18px 18px 0 0' }} />
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <span style={{ fontSize:24 }}>{icon}</span>
        <span style={{ fontSize:11, fontWeight:600, color:'var(--text-faint)', fontFamily:FB, textTransform:'uppercase', letterSpacing:'0.08em' }}>{label}</span>
      </div>
      <p style={{ fontFamily:FD, fontWeight:800, fontSize:36, color, margin:0, lineHeight:1 }}>{display}</p>
    </div>
  );
};

const Shimmer = ({ h=200, r=16 }) => (
  <div style={{ height:h, borderRadius:r, background:'var(--bg-subtle)', border:'1px solid var(--border)',
    backgroundImage:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.05) 50%,transparent 100%)',
    backgroundSize:'400px 100%', animation:'db-shimmer 1.4s ease infinite' }} />
);

const MainDashBoard = () => {
  const { user, role } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const wrapRef = useRef(null);

  const [myRequests,    setMyRequests]    = useState([]);
  const [totalDonors,   setTotalDonors]   = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [allRequests,   setAllRequests]   = useState([]);
  const [loading,       setLoading]       = useState(true);

  useEffect(() => {
    const tasks = [
      axiosSecure.get('/my-request').then(r => setMyRequests(r.data.request || [])).catch(()=>{}),
      axiosSecure.get('/total-donors').then(r => setTotalDonors(r.data.totalDonors || 0)).catch(()=>{}),
      axiosSecure.get('/total-requests').then(r => setTotalRequests(r.data.totalRequests || 0)).catch(()=>{}),
    ];
    if (role === 'admin') {
      tasks.push(axiosSecure.get('/all-requests').then(r => setAllRequests(r.data || [])).catch(()=>{}));
    }
    Promise.all(tasks).finally(() => setLoading(false));
  }, [axiosSecure, role]);

  const activeReqs = role === 'admin' ? allRequests : myRequests;

  // Pie: status breakdown
  const statusData = ['pending','inprogress','done','cancelled'].map(s => ({
    name: s.charAt(0).toUpperCase()+s.slice(1),
    value: activeReqs.filter(r => r.donation_status === s).length,
  })).filter(d => d.value > 0);

  // Bar: blood group distribution
  const bloodData = ['A+','A-','B+','B-','O+','O-','AB+','AB-'].map((g,i) => ({
    group: g, requests: activeReqs.filter(r => r.blood_group === g).length,
    fill: BLOOD_COLORS[i],
  })).filter(d => d.requests > 0);

  // Line: monthly trend
  const now = new Date();
  const monthlyData = Array.from({ length:6 }, (_,i) => {
    const d = new Date(now.getFullYear(), now.getMonth()-5+i, 1);
    return {
      month: d.toLocaleString('default',{ month:'short' }),
      requests: activeReqs.filter(r => {
        if (!r.createdAt) return false;
        const rd = new Date(r.createdAt);
        return rd.getMonth()===d.getMonth() && rd.getFullYear()===d.getFullYear();
      }).length,
    };
  });

  useEffect(() => {
    if (loading) return;
    (async () => {
      try {
        const mod = await import('gsap'); const gsap = mod.gsap||mod.default;
        const cards = wrapRef.current?.querySelectorAll('.db-stat-card');
        if (cards?.length) gsap.fromTo(cards,{opacity:0,y:28,scale:0.93},{opacity:1,y:0,scale:1,duration:0.45,stagger:0.1,ease:'back.out(1.5)',delay:0.1});
        const rows = wrapRef.current?.querySelectorAll('.db-row');
        if (rows?.length) gsap.fromTo(rows,{opacity:0,x:-16},{opacity:1,x:0,duration:0.38,stagger:0.07,ease:'power2.out',delay:0.3});
      } catch {}
    })();
  }, [loading]);

  const hour = new Date().getHours();
  const greeting = hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
  const tick = { fill:'var(--text-muted)', fontFamily:FB, fontSize:11 };

  return (
    <div ref={wrapRef} style={{ padding:'28px 24px', fontFamily:FB }}>
      <style>{CSS}</style>

      {/* Greeting */}
      <div className="db-welcome" style={{ marginBottom:32 }}>
        <p style={{ fontSize:12, fontWeight:600, color:'var(--text-faint)', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 4px', fontFamily:FD }}>{greeting} 👋</p>
        <h1 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(1.5rem,3vw,2.1rem)', color:'var(--text-primary)', margin:'0 0 6px' }}>
          Welcome back, <span style={{ color:'#C00707' }}>{user?.displayName?.split(' ')[0]||'there'}</span>
        </h1>
        <p style={{ fontSize:13, color:'var(--text-muted)', margin:0 }}>{role==='admin'?"Here's your platform overview.":"Here's a summary of your activity."}</p>
      </div>

      {/* Stat cards */}
      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginBottom:28 }}>
          {[...Array(3)].map((_,i)=><Shimmer key={i} h={110}/>)}
        </div>
      ) : role==='admin' ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginBottom:28 }}>
          <StatCard icon="👥" label="Total Users"    target={totalDonors}   color="#C00707" delay="0ms"   />
          <StatCard icon="🩸" label="Total Requests" target={totalRequests} color="#FF4400" delay="100ms" />
          <StatCard icon="✅" label="Completed"      target={allRequests.filter(r=>r.donation_status==='done').length} color="#16a34a" delay="200ms" />
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12, marginBottom:28 }}>
          <StatCard icon="📋" label="My Requests" target={myRequests.length}                                           color="#C00707" delay="0ms"   />
          <StatCard icon="✅" label="Completed"   target={myRequests.filter(r=>r.donation_status==='done').length}     color="#16a34a" delay="100ms" />
          <StatCard icon="⏳" label="Pending"     target={myRequests.filter(r=>r.donation_status==='pending').length}  color="#FFB33F" delay="200ms" />
        </div>
      )}

      {/* Charts */}
      {!loading && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20, marginBottom:24 }}>

          {/* Bar chart */}
          <div className="chart-card">
            <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 20px' }}>Requests by Blood Group</h3>
            {bloodData.length===0
              ? <p style={{ textAlign:'center', color:'var(--text-faint)', fontSize:13, padding:'40px 0' }}>No request data yet</p>
              : <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={bloodData} margin={{top:4,right:4,left:-20,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="group" tick={tick} />
                    <YAxis tick={tick} allowDecimals={false} />
                    <Tooltip content={<CustomTooltip/>} />
                    <Bar dataKey="requests" name="Requests" radius={[6,6,0,0]}>
                      {bloodData.map((d,i) => <Cell key={i} fill={d.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
            }
          </div>

          {/* Line chart */}
          <div className="chart-card">
            <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 20px' }}>Monthly Request Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData} margin={{top:4,right:4,left:-20,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={tick} />
                <YAxis tick={tick} allowDecimals={false} />
                <Tooltip content={<CustomTooltip/>} />
                <Line type="monotone" dataKey="requests" name="Requests" stroke="#C00707" strokeWidth={2.5} dot={{fill:'#C00707',r:4}} activeDot={{r:6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="chart-card">
            <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 20px' }}>Status Breakdown</h3>
            {statusData.length===0
              ? <p style={{ textAlign:'center', color:'var(--text-faint)', fontSize:13, padding:'40px 0' }}>No request data yet</p>
              : <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" nameKey="name">
                      {statusData.map((_,i) => <Cell key={i} fill={PIE_COLORS[i%4]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip/>} />
                    <Legend wrapperStyle={{ fontFamily:FB, fontSize:11 }} />
                  </PieChart>
                </ResponsiveContainer>
            }
          </div>
        </div>
      )}

      {/* Recent requests table */}
      <div className="db-section" style={{ borderRadius:16, border:'1px solid var(--border)', overflow:'hidden' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ fontFamily:FD, fontWeight:700, fontSize:15, color:'var(--text-primary)', margin:0 }}>
            {role==='admin' ? 'Recent Platform Requests' : 'My Recent Requests'}
          </h2>
          <Link to={role==='admin' ? '/dashboard/manage-requests' : 'my-request'}
            style={{ fontSize:12, fontWeight:700, color:'#C00707', textDecoration:'none', fontFamily:FD, transition:'opacity 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.opacity='0.7'}
            onMouseLeave={e=>e.currentTarget.style.opacity='1'}
          >View all →</Link>
        </div>
        {loading ? (
          <div style={{ padding:24, display:'flex', flexDirection:'column', gap:12 }}>
            {[...Array(3)].map((_,i) => <Shimmer key={i} h={40} r={8}/>)}
          </div>
        ) : activeReqs.length===0 ? (
          <div style={{ padding:'48px 24px', textAlign:'center' }}>
            <p style={{ fontSize:32, margin:'0 0 8px' }}>🩸</p>
            <p style={{ fontFamily:FD, fontWeight:600, fontSize:14, color:'var(--text-muted)', margin:'0 0 4px' }}>No requests yet</p>
            <Link to="add-request" style={{ fontSize:12, color:'#C00707', fontFamily:FD, fontWeight:700 }}>Create your first →</Link>
          </div>
        ) : (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13, fontFamily:FB }}>
              <thead>
                <tr style={{ borderBottom:'1px solid var(--border)' }}>
                  {['#','Recipient','Hospital','Blood','Status'].map(h => (
                    <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:10, fontWeight:700, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:FD }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeReqs.slice(0,5).map((req,i) => {
                  const st = statusColors[req.donation_status]||statusColors.pending;
                  return (
                    <tr key={req._id} className="db-row" style={{ borderBottom:'1px solid var(--border)', animationDelay:`${i*70}ms` }}
                      onMouseEnter={e=>e.currentTarget.style.backgroundColor='var(--bg-subtle)'}
                      onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
                    >
                      <td style={{ padding:'12px 16px', color:'var(--text-faint)', fontFamily:FD, fontWeight:700 }}>{i+1}</td>
                      <td style={{ padding:'12px 16px', color:'var(--text-primary)', fontWeight:600 }}>{req.recipient_name}</td>
                      <td style={{ padding:'12px 16px', color:'var(--text-muted)' }}>{req.hospital_name}</td>
                      <td style={{ padding:'12px 16px' }}>
                        <span style={{ fontFamily:FD, fontWeight:800, color:'#C00707', background:'rgba(192,7,7,0.1)', padding:'2px 8px', borderRadius:6, fontSize:12 }}>{req.blood_group}</span>
                      </td>
                      <td style={{ padding:'12px 16px' }}>
                        <span style={{ display:'inline-flex', alignItems:'center', gap:6, ...st, padding:'3px 10px', borderRadius:99, fontSize:11, fontWeight:700, fontFamily:FD }}>
                          <span className="status-dot" style={{ backgroundColor:st.dot, color:st.dot }} />
                          {req.donation_status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashBoard;