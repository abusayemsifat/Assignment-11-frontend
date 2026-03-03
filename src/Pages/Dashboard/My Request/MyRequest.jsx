import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const bloodColors = {
    'A+':'#C00707','A-':'#FF4400','B+':'#134E8E','B-':'#0d3d70',
    'O+':'#166534','O-':'#14532d','AB+':'#6b21a8','AB-':'#4a044e',
};
const statusColors = {
    pending:    { bg:'rgba(192,7,7,0.12)',    color:'#ef4444' },
    inprogress: { bg:'rgba(19,78,142,0.15)',  color:'#60a5fa' },
    done:       { bg:'rgba(22,101,52,0.15)',   color:'#4ade80' },
    cancelled:  { bg:'rgba(100,100,100,0.1)', color:'#9ca3af' },
};

const MyRequest = () => {
    const [myRequests, setMyRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setLoading(true);
        axiosSecure.get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                setMyRequests(res.data.request || []);
                setTotalRequest(res.data.totalRequest || 0);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [axiosSecure, currentPage, itemsPerPage]);

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);

    return (
        <div style={{ fontFamily: FONT_BODY }}>
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 12, marginBottom: 24,
            }}>
                <div>
                    <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(18px,3vw,22px)', color: 'var(--text-primary)', margin: 0 }}>
                        My Requests
                    </h1>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>
                        {totalRequest} total request{totalRequest !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* Table card */}
            <div style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
                        <thead>
                            <tr style={{ backgroundColor: 'rgba(192,7,7,0.06)' }}>
                                {['#','Recipient','Hospital','Blood Group','District','Status'].map(h => (
                                    <th key={h} style={{
                                        padding: '13px 16px', textAlign: 'left',
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
                                        {[1,2,3,4,5,6].map(j => (
                                            <td key={j} style={{ padding: '13px 16px' }}>
                                                <div style={{ height: 14, borderRadius: 6, backgroundColor: 'var(--bg-muted)', animation: 'pulse 1.5s infinite' }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : myRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: FONT_BODY, fontSize: 14 }}>
                                        <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
                                        No requests found
                                    </td>
                                </tr>
                            ) : (
                                myRequests.map((req, i) => {
                                    const bc = bloodColors[req.blood_group] || '#C00707';
                                    const sc = statusColors[req.donation_status] || statusColors.pending;
                                    return (
                                        <tr key={req._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(192,7,7,0.04)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <td style={{ padding: '13px 16px', color: 'var(--text-muted)', fontFamily: FONT_BODY, fontSize: 13 }}>
                                                {(currentPage - 1) * itemsPerPage + i + 1}
                                            </td>
                                            <td style={{ padding: '13px 16px', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                                {req.recipient_name}
                                            </td>
                                            <td style={{ padding: '13px 16px', fontFamily: FONT_BODY, fontSize: 13, color: 'var(--text-muted)' }}>
                                                {req.hospital_name}
                                            </td>
                                            <td style={{ padding: '13px 16px' }}>
                                                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 8, backgroundColor: bc + '20', color: bc, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 12 }}>
                                                    {req.blood_group}
                                                </span>
                                            </td>
                                            <td style={{ padding: '13px 16px', fontFamily: FONT_BODY, fontSize: 13, color: 'var(--text-muted)' }}>
                                                {req.recipient_district}
                                            </td>
                                            <td style={{ padding: '13px 16px' }}>
                                                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 8, backgroundColor: sc.bg, color: sc.color, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 12 }}>
                                                    {req.donation_status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {numberOfPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                        style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid var(--border)', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1 }}>
                        ← Prev
                    </button>
                    {pages.map(page => (
                        <button key={page} onClick={() => setCurrentPage(page)}
                            style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid var(--border)', backgroundColor: page === currentPage ? '#C00707' : 'var(--bg-subtle)', color: page === currentPage ? '#fff' : 'var(--text-muted)', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.18s' }}>
                            {page}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(p => Math.min(numberOfPages, p + 1))} disabled={currentPage === numberOfPages}
                        style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid var(--border)', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, cursor: currentPage === numberOfPages ? 'not-allowed' : 'pointer', opacity: currentPage === numberOfPages ? 0.4 : 1 }}>
                        Next →
                    </button>
                </div>
            )}

            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
        </div>
    );
};

export default MyRequest;