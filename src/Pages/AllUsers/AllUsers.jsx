import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const roleBadge = { admin: { bg: 'rgba(192,7,7,0.14)', color: '#C00707' }, donor: { bg: 'rgba(19,78,142,0.15)', color: '#60a5fa' }, volunteer: { bg: 'rgba(22,101,52,0.15)', color: '#4ade80' } };
const statusBadge = { active: { bg: 'rgba(22,101,52,0.15)', color: '#4ade80' }, blocked: { bg: 'rgba(192,7,7,0.12)', color: '#ef4444' } };

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchUsers = () => {
        setLoading(true);
        axiosSecure.get('/users').then(res => { setUsers(res.data); setLoading(false); }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchUsers(); }, [axiosSecure]);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(() => fetchUsers());
    };

    const filtered = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ fontFamily: FONT_BODY }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(18px,3vw,22px)', color: 'var(--text-primary)', margin: 0 }}>All Users</h1>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>{users.length} registered users</p>
                </div>
                <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search users..."
                    style={{
                        padding: '9px 14px', borderRadius: 10, border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)',
                        fontFamily: FONT_BODY, fontSize: 13, outline: 'none', width: 220,
                    }}
                    onFocus={e => e.target.style.borderColor = '#C00707'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
            </div>

            <div style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
                        <thead>
                            <tr style={{ backgroundColor: 'rgba(192,7,7,0.06)' }}>
                                {['User','Email','Blood','District','Role','Status','Action'].map(h => (
                                    <th key={h} style={{
                                        padding: '12px 16px', textAlign: 'left',
                                        fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 11,
                                        textTransform: 'uppercase', letterSpacing: '0.07em',
                                        color: 'var(--text-muted)', borderBottom: '1px solid var(--border)',
                                        whiteSpace: 'nowrap',
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        {[1,2,3,4,5,6,7].map(j => (
                                            <td key={j} style={{ padding: '14px 16px' }}>
                                                <div style={{ height: 14, borderRadius: 6, backgroundColor: 'var(--bg-muted)', animation: 'pulse 1.5s infinite' }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: FONT_BODY, fontSize: 14 }}>
                                        <div style={{ fontSize: 36, marginBottom: 10 }}>👥</div>
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(u => {
                                    const rb = roleBadge[u.role] || roleBadge.donor;
                                    const sb = statusBadge[u.status] || statusBadge.active;
                                    return (
                                        <tr key={u._id || u.email} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(192,7,7,0.03)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <td style={{ padding: '12px 16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <div style={{
                                                        width: 36, height: 36, borderRadius: 10, overflow: 'hidden',
                                                        backgroundColor: 'var(--bg-muted)', flexShrink: 0,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        {u.mainPhotoUrl
                                                            ? <img src={u.mainPhotoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            : <span style={{ fontSize: 16 }}>👤</span>
                                                        }
                                                    </div>
                                                    <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                                        {u.name || '—'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px 16px', fontFamily: FONT_BODY, fontSize: 12, color: 'var(--text-muted)' }}>{u.email}</td>
                                            <td style={{ padding: '12px 16px' }}>
                                                {u.blood ? (
                                                    <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:6, backgroundColor:'rgba(192,7,7,0.15)', color:'#C00707', fontFamily: FONT_DISPLAY, fontWeight:700, fontSize:12 }}>
                                                        {u.blood}
                                                    </span>
                                                ) : <span style={{ color: 'var(--text-faint)', fontSize:12 }}>—</span>}
                                            </td>
                                            <td style={{ padding: '12px 16px', fontFamily: FONT_BODY, fontSize: 13, color: 'var(--text-muted)' }}>{u.district || '—'}</td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:8, backgroundColor: rb.bg, color: rb.color, fontFamily: FONT_BODY, fontWeight:600, fontSize:12, textTransform:'capitalize' }}>
                                                    {u.role || 'donor'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:8, backgroundColor: sb.bg, color: sb.color, fontFamily: FONT_BODY, fontWeight:600, fontSize:12, textTransform:'capitalize' }}>
                                                    {u.status || 'active'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 16px' }}>
                                                {u.status === 'active' ? (
                                                    <button onClick={() => handleStatusChange(u.email, 'blocked')}
                                                        style={{ padding: '6px 14px', borderRadius: 8, border: 'none', backgroundColor: 'rgba(192,7,7,0.14)', color: '#C00707', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                                                        Block
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleStatusChange(u.email, 'active')}
                                                        style={{ padding: '6px 14px', borderRadius: 8, border: 'none', backgroundColor: 'rgba(22,101,52,0.15)', color: '#4ade80', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                                                        Activate
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
        </div>
    );
};

export default AllUsers;