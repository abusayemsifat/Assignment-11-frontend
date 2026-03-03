import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const bloodColors = {
    'A+': '#C00707', 'A-': '#FF4400', 'B+': '#134E8E', 'B-': '#0d3d70',
    'O+': '#166534', 'O-': '#14532d', 'AB+': '#6b21a8', 'AB-': '#4a044e',
};
const statusColors = {
    pending:    { bg: 'rgba(192,7,7,0.12)',    color: '#ef4444' },
    inprogress: { bg: 'rgba(19,78,142,0.15)',  color: '#60a5fa' },
    done:       { bg: 'rgba(22,101,52,0.15)',   color: '#4ade80' },
    cancelled:  { bg: 'rgba(100,100,100,0.1)', color: '#9ca3af' },
};

const StatCard = ({ value, label, icon, color }) => (
    <div style={{
        backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '22px 20px',
        display: 'flex', alignItems: 'center', gap: 16,
    }}>
        <div style={{
            width: 50, height: 50, borderRadius: 14, flexShrink: 0,
            backgroundColor: color + '18',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>{icon}</div>
        <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 26, color: 'var(--text-primary)', lineHeight: 1.1 }}>{value}</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>{label}</div>
        </div>
    </div>
);

const MainDashBoard = () => {
    const { user, role } = useContext(AuthContext);
    const [myRequests, setMyRequests] = useState([]);
    const [totalDonors, setTotalDonors] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (role === 'admin') {
            Promise.all([axiosSecure.get('/total-donors'), axiosSecure.get('/total-requests')])
                .then(([d, r]) => { setTotalDonors(d.data.totalDonors); setTotalRequests(r.data.totalRequests); setLoading(false); })
                .catch(() => setLoading(false));
        } else {
            axiosSecure.get('/my-request')
                .then(res => { setMyRequests(res.data.request || []); setLoading(false); })
                .catch(() => setLoading(false));
        }
    }, [axiosSecure, role]);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    return (
        <div style={{ fontFamily: FONT_BODY }}>
            {/* Welcome banner */}
            <div style={{
                background: 'linear-gradient(135deg,#7B0000 0%,#C00707 55%,#FF4400 100%)',
                borderRadius: 20, padding: '28px', marginBottom: 28, position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position:'absolute',top:-30,right:-30,width:130,height:130,borderRadius:'50%',backgroundColor:'rgba(255,255,255,0.06)' }} />
                <div style={{ position:'absolute',bottom:-20,right:80,width:80,height:80,borderRadius:'50%',backgroundColor:'rgba(255,255,255,0.04)' }} />
                <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 5 }}>{greeting} 👋</div>
                <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(18px,4vw,26px)', color:'#fff', margin: 0, lineHeight: 1.2 }}>
                    Welcome back, {user?.displayName || 'User'}
                </h1>
                <div style={{ fontSize: 13, color:'rgba(255,255,255,0.65)', marginTop: 6 }}>
                    {role === 'admin' ? '🛡️ Administrator' : '🩸 Blood Donor'}
                </div>
            </div>

            {/* Admin */}
            {role === 'admin' && (
                <div>
                    <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, color:'var(--text-primary)', marginBottom: 16 }}>Platform Overview</h2>
                    {loading ? (
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:14 }}>
                            {[1,2,3].map(i=><div key={i} style={{ height:96,borderRadius:16,backgroundColor:'var(--bg-subtle)',animation:'pulse 1.5s infinite' }} />)}
                        </div>
                    ) : (
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:14 }}>
                            <StatCard value={totalDonors} label="Total Donors" icon="🩸" color="#C00707" />
                            <StatCard value={0} label="Total Funding" icon="💰" color="#FFB33F" />
                            <StatCard value={totalRequests} label="Blood Requests" icon="📋" color="#134E8E" />
                        </div>
                    )}
                    <div style={{ marginTop:24, padding:'20px', backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:16 }}>
                        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight:700, fontSize:14, color:'var(--text-primary)', marginBottom:12, marginTop:0 }}>Quick Actions</h3>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                            {[
                                { label:'Manage Requests', to:'/dashboard/manage-requests', color:'#C00707' },
                                { label:'All Users', to:'/dashboard/all-users', color:'#134E8E' },
                                { label:'Reports', to:'/dashboard/reports', color:'#166534' },
                                { label:'Blog', to:'/dashboard/blog', color:'#6b21a8' },
                            ].map(a => (
                                <Link key={a.to} to={a.to} style={{
                                    padding:'8px 16px', borderRadius:10, textDecoration:'none',
                                    backgroundColor: a.color+'18', color: a.color,
                                    fontFamily: FONT_BODY, fontWeight:600, fontSize:13,
                                    border:`1px solid ${a.color}30`,
                                }}>
                                    {a.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Donor */}
            {role !== 'admin' && (
                <div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
                        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight:700, fontSize:17, color:'var(--text-primary)', margin:0 }}>My Recent Requests</h2>
                        <Link to="my-request" style={{ padding:'8px 16px', borderRadius:10, textDecoration:'none', backgroundColor:'#C00707', color:'#fff', fontFamily: FONT_BODY, fontWeight:600, fontSize:13 }}>
                            View All
                        </Link>
                    </div>
                    {loading ? (
                        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                            {[1,2,3].map(i=><div key={i} style={{ height:56,borderRadius:12,backgroundColor:'var(--bg-subtle)',animation:'pulse 1.5s infinite' }} />)}
                        </div>
                    ) : myRequests.length === 0 ? (
                        <div style={{ textAlign:'center', padding:'48px 24px', backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:16 }}>
                            <div style={{ fontSize:40, marginBottom:12 }}>🩸</div>
                            <div style={{ fontFamily: FONT_DISPLAY, fontWeight:700, fontSize:16, color:'var(--text-primary)', marginBottom:6 }}>No requests yet</div>
                            <p style={{ fontFamily: FONT_BODY, fontSize:13, color:'var(--text-muted)', marginBottom:16 }}>Create your first blood donation request</p>
                            <Link to="add-request" style={{ padding:'10px 20px', borderRadius:10, textDecoration:'none', backgroundColor:'#C00707', color:'#fff', fontFamily: FONT_BODY, fontWeight:600, fontSize:13 }}>
                                + Add Request
                            </Link>
                        </div>
                    ) : (
                        <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden' }}>
                            <div style={{ overflowX:'auto' }}>
                                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:460 }}>
                                    <thead>
                                        <tr style={{ backgroundColor:'rgba(192,7,7,0.06)' }}>
                                            {['#','Recipient','Hospital','Blood','Status'].map(h=>(
                                                <th key={h} style={{ padding:'11px 15px', textAlign:'left', fontFamily: FONT_DISPLAY, fontWeight:700, fontSize:11, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--text-muted)', borderBottom:'1px solid var(--border)' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myRequests.slice(0,3).map((req, i) => {
                                            const sc = statusColors[req.donation_status] || statusColors.pending;
                                            const bc = bloodColors[req.blood_group] || '#C00707';
                                            return (
                                                <tr key={req._id} style={{ borderBottom:'1px solid var(--border)' }}>
                                                    <td style={{ padding:'12px 15px', color:'var(--text-muted)', fontFamily: FONT_BODY, fontSize:13 }}>{i+1}</td>
                                                    <td style={{ padding:'12px 15px', fontFamily: FONT_BODY, fontWeight:600, fontSize:13, color:'var(--text-primary)' }}>{req.recipient_name}</td>
                                                    <td style={{ padding:'12px 15px', fontFamily: FONT_BODY, fontSize:13, color:'var(--text-muted)' }}>{req.hospital_name}</td>
                                                    <td style={{ padding:'12px 15px' }}>
                                                        <span style={{ display:'inline-block', padding:'3px 9px', borderRadius:8, backgroundColor: bc+'20', color: bc, fontFamily: FONT_DISPLAY, fontWeight:700, fontSize:12 }}>{req.blood_group}</span>
                                                    </td>
                                                    <td style={{ padding:'12px 15px' }}>
                                                        <span style={{ display:'inline-block', padding:'3px 9px', borderRadius:8, backgroundColor: sc.bg, color: sc.color, fontFamily: FONT_BODY, fontWeight:600, fontSize:12 }}>{req.donation_status}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
        </div>
    );
};

export default MainDashBoard;