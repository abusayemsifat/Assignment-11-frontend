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
    const [sortKey, setSortKey] = useState('name');
    const [sortDir, setSortDir] = useState('asc');
    const [page, setPage] = useState(1);
    const PER = 10;

    const fetchUsers = () => {
        setLoading(true);
        axiosSecure.get('/users').then(res => { setUsers(res.data); setLoading(false); }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchUsers(); }, [axiosSecure]);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(() => fetchUsers());
    };

    const filtered = users
        .filter(u =>
            u.name?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const av = (a[sortKey] || '').toLowerCase();
            const bv = (b[sortKey] || '').toLowerCase();
            return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
        });
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
    const paginated  = filtered.slice((page - 1) * PER, page * PER);

    const handleSort = (key) => {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('asc'); }
    };

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
                        fontFamily: FONT_BODY, fontSize: 13, outline: 'none', width: '100%', maxWidth: 220,
                    }}
                    onFocus={e => e.target.style.borderColor = '#C00707'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden">
                {loading ? (
                    [...Array(5)].map((_, i) => (
                        <div key={i} style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 16, padding: 16, marginBottom: 12 }}>
                            <div style={{ height: 14, borderRadius: 6, backgroundColor: 'var(--bg-muted)', animation: 'pulse 1.5s infinite', marginBottom: 10 }} />
                            <div style={{ height: 14, borderRadius: 6, backgroundColor: 'var(--bg-muted)', animation: 'pulse 1.5s infinite', width: '80%' }} />
                        </div>
                    ))
                ) : paginated.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>No users found</div>
                ) : (
                    paginated.map(u => {
                        const rb = roleBadge[u.role] || roleBadge.donor;
                        const sb = statusBadge[u.status] || statusBadge.active;
                        return (
                            <div key={u._id || u.email} style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 16, padding: 16, marginBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', backgroundColor: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {u.mainPhotoUrl
                                            ? <img src={u.mainPhotoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            : <span style={{ fontSize: 24 }}>👤</span>
                                        }
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', margin: 0 }}>{u.name || '—'}</p>
                                        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0' }}>{u.email}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                                    <div style={{ flex: 1, minWidth: 100 }}>
                                        <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: 0, marginBottom: 4 }}>Blood Group</p>
                                        {u.blood ? (
                                            <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 8, backgroundColor: 'rgba(192,7,7,0.15)', color: '#C00707', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13 }}>
                                                {u.blood}
                                            </span>
                                        ) : <span style={{ color: 'var(--text-faint)', fontSize: 13 }}>—</span>}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 100 }}>
                                        <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: 0, marginBottom: 4 }}>District</p>
                                        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>{u.district || '—'}</p>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 100 }}>
                                        <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: 0, marginBottom: 4 }}>Role</p>
                                        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 8, backgroundColor: rb.bg, color: rb.color, fontSize: 12, fontWeight: 600 }}>
                                            {u.role || 'donor'}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 100 }}>
                                        <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: 0, marginBottom: 4 }}>Status</p>
                                        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 8, backgroundColor: sb.bg, color: sb.color, fontSize: 12, fontWeight: 600 }}>
                                            {u.status || 'active'}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ marginTop: 12 }}>
                                    {u.status === 'active' ? (
                                        <button onClick={() => handleStatusChange(u.email, 'blocked')}
                                            style={{ width: '100%', padding: '8px 16px', borderRadius: 10, border: 'none', backgroundColor: 'rgba(192,7,7,0.14)', color: '#C00707', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                                            Block User
                                        </button>
                                    ) : (
                                        <button onClick={() => handleStatusChange(u.email, 'active')}
                                            style={{ width: '100%', padding: '8px 16px', borderRadius: 10, border: 'none', backgroundColor: 'rgba(22,101,52,0.15)', color: '#4ade80', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                                            Activate User
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                        <thead>
                            <tr style={{ backgroundColor: 'rgba(192,7,7,0.06)' }}>
                                {[
                                    { label: 'User', key: 'name' },
                                    { label: 'Email', key: 'email' },
                                    { label: 'Blood', key: null },
                                    { label: 'District', key: 'district' },
                                    { label: 'Role', key: 'role' },
                                    { label: 'Status', key: 'status' },
                                    { label: 'Action', key: null },
                                ].map(({ label, key }) => (
                                    <th key={label} onClick={() => key && handleSort(key)}
                                        style={{
                                            padding: '12px 16px', textAlign: 'left',
                                            fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 11,
                                            textTransform: 'uppercase', letterSpacing: '0.07em',
                                            color: sortKey === key ? '#C00707' : 'var(--text-muted)',
                                            borderBottom: '1px solid var(--border)',
                                            whiteSpace: 'nowrap',
                                            cursor: key ? 'pointer' : 'default',
                                            userSelect: 'none',
                                        }}>
                                        {label} {key && sortKey === key ? (sortDir === 'asc' ? '↑' : '↓') : (key ? '↕' : '')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        {[1, 2, 3, 4, 5, 6, 7].map(j => (
                                            <td key={j} style={{ padding: '14px 16px' }}>
                                                <div style={{ height: 14, borderRadius: 6, backgroundColor: 'var(--bg-muted)', animation: 'pulse 1.5s infinite' }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: FONT_BODY, fontSize: 14 }}>
                                        <div style={{ fontSize: 36, marginBottom: 10 }}>👥</div>
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                paginated.map(u => {
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
                                                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 6, backgroundColor: 'rgba(192,7,7,0.15)', color: '#C00707', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 12 }}>
                                                        {u.blood}
                                                    </span>
                                                ) : <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>—</span>}
                                            </td>
                                            <td style={{ padding: '12px 16px', fontFamily: FONT_BODY, fontSize: 13, color: 'var(--text-muted)' }}>{u.district || '—'}</td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 8, backgroundColor: rb.bg, color: rb.color, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 12, textTransform: 'capitalize' }}>
                                                    {u.role || 'donor'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 8, backgroundColor: sb.bg, color: sb.color, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 12, textTransform: 'capitalize' }}>
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

            {!loading && totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                        style={{ padding: '7px 14px', borderRadius: 9, border: '1px solid var(--border)', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)', fontSize: 12, fontFamily: FONT_DISPLAY, cursor: 'pointer', opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i} onClick={() => setPage(i + 1)}
                            style={{ width: 34, height: 34, borderRadius: 9, border: `1px solid ${page === i + 1 ? '#C00707' : 'var(--border)'}`, backgroundColor: page === i + 1 ? '#C00707' : 'var(--bg-subtle)', color: page === i + 1 ? '#fff' : 'var(--text-muted)', fontSize: 12, fontFamily: FONT_DISPLAY, cursor: 'pointer' }}>{i + 1}</button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                        style={{ padding: '7px 14px', borderRadius: 9, border: '1px solid var(--border)', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)', fontSize: 12, fontFamily: FONT_DISPLAY, cursor: 'pointer', opacity: page === totalPages ? 0.4 : 1 }}>Next →</button>
                </div>
            )}
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
        </div>
    );
};

export default AllUsers;