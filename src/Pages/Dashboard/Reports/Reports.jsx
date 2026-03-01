import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";

const bloodGroups = ['A+','A-','B+','B-','O+','O-','AB+','AB-'];
const bloodColors = {
  'A+':'#C00707','A-':'#FF4400','B+':'#134E8E','B-':'#0d3d70',
  'O+':'#166534','O-':'#14532d','AB+':'#6b21a8','AB-':'#4a044e',
};

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:16, padding:22, display:'flex', gap:16, alignItems:'center', boxShadow:'var(--shadow-sm)' }}>
      <div style={{ width:52, height:52, borderRadius:14, backgroundColor: color+'18', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>{icon}</div>
      <div>
        <p style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:26, color, margin:0 }}>{value}</p>
        <p style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)', margin:'2px 0 0', fontFamily:FONT_DISPLAY }}>{label}</p>
        {sub && <p style={{ fontSize:11, color:'var(--text-faint)', margin:'2px 0 0', fontFamily:FONT_BODY }}>{sub}</p>}
      </div>
    </div>
  );
}

function BarChart({ data, title, colorKey }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:16, padding:24, boxShadow:'var(--shadow-sm)' }}>
      <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:16, color:'var(--text-primary)', margin:'0 0 20px' }}>{title}</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {data.map((item, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:44, fontSize:12, fontWeight:700, fontFamily:FONT_DISPLAY, color: colorKey ? bloodColors[item.label] : 'var(--text-muted)', textAlign:'right', flexShrink:0 }}>{item.label}</div>
            <div style={{ flex:1, backgroundColor:'var(--bg-muted)', borderRadius:99, height:20, overflow:'hidden' }}>
              <div style={{
                height:'100%', borderRadius:99, transition:'width 0.6s ease',
                width: `${Math.max(4, (item.value / max) * 100)}%`,
                backgroundColor: colorKey ? bloodColors[item.label] || '#C00707' : '#C00707',
              }} />
            </div>
            <div style={{ width:36, fontSize:12, fontWeight:700, fontFamily:FONT_DISPLAY, color:'var(--text-primary)', flexShrink:0 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const Reports = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({ totalDonors:0, totalRequests:0, totalFunding:0, completedDonations:0 });
  const [bloodStats, setBloodStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cur = new Date();

    Promise.allSettled([
      axiosSecure.get('/total-donors'),
      axiosSecure.get('/total-requests'),
    ]).then(([donors, reqs]) => {
      setStats({
        totalDonors:    donors.status === 'fulfilled' ? donors.value.data.totalDonors : 0,
        totalRequests:  reqs.status   === 'fulfilled' ? reqs.value.data.totalRequests : 0,
        totalFunding:   0,
        completedDonations: 0,
      });
    }).finally(() => setLoading(false));

    // Static blood group distribution as placeholder
    setBloodStats(bloodGroups.map(g => ({
      label: g,
      value: Math.floor(Math.random() * 80 + 10),
    })));
  }, [axiosSecure]);

  // Monthly mock data
  const monthlyData = MONTHS.slice(0,7).map((m, i) => ({
    label: m,
    value: Math.floor(Math.random() * 60 + 15) + i * 8,
  }));

  return (
    <div style={{ fontFamily:FONT_BODY }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:22, color:'var(--text-primary)', margin:'0 0 4px' }}>Reports & Analytics</h1>
        <p style={{ fontSize:13, color:'var(--text-muted)', margin:0, fontFamily:FONT_BODY }}>Overview of platform activity and statistics</p>
      </div>

      {/* Stat cards */}
      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:28 }}>
          {[...Array(4)].map((_,i) => (
            <div key={i} style={{ backgroundColor:'var(--bg-base)', borderRadius:16, height:100, border:'1px solid var(--border)', animation:'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:28 }}>
          <StatCard icon="👥" label="Total Donors"    value={stats.totalDonors}   color="#C00707" sub="Registered users" />
          <StatCard icon="🩸" label="Total Requests"  value={stats.totalRequests} color="#FF4400" sub="All time" />
          <StatCard icon="✅" label="Completed"       value={stats.completedDonations} color="#166534" sub="Successful donations" />
          <StatCard icon="💰" label="Total Funding"   value={`৳${stats.totalFunding.toLocaleString()}`} color="#134E8E" sub="Platform donations" />
        </div>
      )}

      {/* Charts */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20 }}>
        <BarChart title="Monthly Requests (2025)" data={monthlyData} />
        <BarChart title="Donors by Blood Group" data={bloodStats} colorKey />
      </div>

      {/* Activity table */}
      <div style={{ marginTop:20, backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', boxShadow:'var(--shadow-sm)' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)' }}>
          <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:15, color:'var(--text-primary)', margin:0 }}>Blood Group Summary</h3>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:FONT_BODY }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--border)' }}>
                {['Blood Group','Available Donors','Pending Requests','Status'].map(h => (
                  <th key={h} style={{ padding:'11px 16px', textAlign:'left', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, color:'var(--text-muted)', fontFamily:FONT_DISPLAY }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloodGroups.map(g => {
                const donors   = Math.floor(Math.random() * 50 + 5);
                const requests = Math.floor(Math.random() * 20 + 1);
                const ok       = donors > requests;
                return (
                  <tr key={g} style={{ borderBottom:'1px solid var(--border)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor='var(--bg-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor='transparent'}
                  >
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:15, color: bloodColors[g] }}>{g}</span>
                    </td>
                    <td style={{ padding:'12px 16px', fontSize:13, color:'var(--text-primary)', fontFamily:FONT_BODY }}>{donors}</td>
                    <td style={{ padding:'12px 16px', fontSize:13, color:'var(--text-primary)', fontFamily:FONT_BODY }}>{requests}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:99, fontSize:11, fontWeight:700, fontFamily:FONT_DISPLAY, backgroundColor: ok ? 'rgba(22,101,52,0.1)' : 'rgba(192,7,7,0.1)', color: ok ? '#166534' : '#C00707' }}>
                        {ok ? 'Sufficient' : 'Low Supply'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;