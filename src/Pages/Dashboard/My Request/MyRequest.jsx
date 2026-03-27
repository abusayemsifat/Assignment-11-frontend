import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { createPortal } from 'react-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";
const RED = '#C00707';

const bloodColors = {
    'A+':'#C00707','A-':'#FF4400','B+':'#134E8E','B-':'#0d3d70',
    'O+':'#166534','O-':'#14532d','AB+':'#6b21a8','AB-':'#4a044e',
};
const statusColors = {
    pending:    { bg:'rgba(192,7,7,0.12)',    color:'#ef4444' },
    inprogress: { bg:'rgba(19,78,142,0.15)',  color:'#60a5fa' },
    done:       { bg:'rgba(22,101,52,0.15)',  color:'#4ade80' },
    cancelled:  { bg:'rgba(100,100,100,0.1)',color:'#9ca3af' },
};
const ITEMS_PER_PAGE = 10;

function EditModal({ req, onClose, onSave }) {
    const [form, setForm] = useState({
        recipient_name:     req.recipient_name     || '',
        hospital_name:      req.hospital_name      || '',
        recipient_district: req.recipient_district || '',
        recipient_upazila:  req.recipient_upazila  || '',
        blood_group:        req.blood_group        || '',
        donation_date:      req.donation_date      || '',
        donation_time:      req.donation_time      || '',
        message:            req.message            || '',
    });
    const [saving, setSaving] = useState(false);
    const scrollRef = useRef(null);
    
    const inp = { 
        width: '100%', 
        padding: '10px 14px', 
        borderRadius: 10, 
        border: '1px solid var(--border)', 
        backgroundColor: 'var(--bg-base)', 
        color: 'var(--text-primary)', 
        fontSize: 13, 
        fontFamily: FB, 
        outline: 'none', 
        boxSizing: 'border-box',
        transition: 'border-color 0.18s'
    };
    
    const lbl = { 
        display: 'block', 
        marginBottom: 6, 
        fontSize: 12, 
        fontWeight: 600, 
        color: 'var(--text-muted)', 
        fontFamily: FD 
    };
    
    const handleSave = () => {
        if (!form.recipient_name.trim()) return;
        setSaving(true);
        onSave(req._id, form, () => setSaving(false));
    };
    
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    
    const modalContent = (
        <div 
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{ 
                position: 'fixed', 
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.7)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                zIndex: 999999,
                padding: 20,
                backdropFilter: 'blur(4px)'
            }}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                style={{ 
                    backgroundColor: 'var(--bg-base)', 
                    borderRadius: 20, 
                    width: '100%', 
                    maxWidth: 600,
                    border: '1px solid var(--border)', 
                    boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div style={{ 
                    padding: '20px 24px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexShrink: 0,
                    backgroundColor: 'var(--bg-base)',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}>
                    <h2 style={{ fontFamily: FD, fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', margin: 0 }}>Edit Request</h2>
                    <button 
                        onClick={onClose} 
                        style={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: 8, 
                            border: 'none', 
                            backgroundColor: 'var(--bg-muted)', 
                            color: 'var(--text-muted)', 
                            cursor: 'pointer', 
                            fontSize: 18,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ×
                    </button>
                </div>
                
                <div 
                    ref={scrollRef}
                    style={{ 
                        padding: '24px',
                        overflowY: 'auto',
                        flex: 1,
                        minHeight: 0
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label style={lbl}>Patient Name *</label>
                            <input 
                                type="text" 
                                value={form.recipient_name} 
                                onChange={e => setForm(p => ({...p, recipient_name: e.target.value}))} 
                                style={inp}
                                onFocus={e => e.target.style.borderColor = RED} 
                                onBlur={e => e.target.style.borderColor = 'var(--border)'} 
                            />
                        </div>
                        
                        <div>
                            <label style={lbl}>Hospital</label>
                            <input 
                                type="text" 
                                value={form.hospital_name} 
                                onChange={e => setForm(p => ({...p, hospital_name: e.target.value}))} 
                                style={inp}
                                onFocus={e => e.target.style.borderColor = RED} 
                                onBlur={e => e.target.style.borderColor = 'var(--border)'} 
                            />
                        </div>
                        
                        <div>
                            <label style={lbl}>District</label>
                            <input 
                                type="text" 
                                value={form.recipient_district} 
                                onChange={e => setForm(p => ({...p, recipient_district: e.target.value}))} 
                                style={inp}
                                onFocus={e => e.target.style.borderColor = RED} 
                                onBlur={e => e.target.style.borderColor = 'var(--border)'} 
                            />
                        </div>
                        
                        <div>
                            <label style={lbl}>Upazila</label>
                            <input 
                                type="text" 
                                value={form.recipient_upazila} 
                                onChange={e => setForm(p => ({...p, recipient_upazila: e.target.value}))} 
                                style={inp}
                                onFocus={e => e.target.style.borderColor = RED} 
                                onBlur={e => e.target.style.borderColor = 'var(--border)'} 
                            />
                        </div>
                        
                        <div>
                            <label style={lbl}>Blood Group</label>
                            <select 
                                value={form.blood_group} 
                                onChange={e => setForm(p => ({...p, blood_group: e.target.value}))} 
                                style={inp}
                                onFocus={e => e.target.style.borderColor = RED} 
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            >
                                <option value="">Select Blood Group</option>
                                {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label style={lbl}>Donation Date</label>
                            <input 
                                type="date" 
                                value={form.donation_date} 
                                onChange={e => setForm(p => ({...p, donation_date: e.target.value}))} 
                                style={inp}
                                onFocus={e => e.target.style.borderColor = RED} 
                                onBlur={e => e.target.style.borderColor = 'var(--border)'} 
                            />
                        </div>
                        
                        <div>
                            <label style={lbl}>Donation Time</label>
                            <input 
                                type="time" 
                                value={form.donation_time} 
                                onChange={e => setForm(p => ({...p, donation_time: e.target.value}))} 
                                style={inp}
                                onFocus={e => e.target.style.borderColor = RED} 
                                onBlur={e => e.target.style.borderColor = 'var(--border)'} 
                            />
                        </div>
                        
                        <div>
                            <label style={lbl}>Additional Message</label>
                            <textarea 
                                value={form.message} 
                                onChange={e => setForm(p => ({...p, message: e.target.value}))} 
                                rows={3}
                                style={{ ...inp, resize: 'vertical' }}
                                onFocus={e => e.target.style.borderColor = RED} 
                                onBlur={e => e.target.style.borderColor = 'var(--border)'} 
                            />
                        </div>
                    </div>
                </div>
                
                <div style={{ 
                    padding: '16px 24px 20px 24px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex', 
                    gap: 12, 
                    justifyContent: 'flex-end',
                    flexShrink: 0,
                    backgroundColor: 'var(--bg-base)',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                    <button 
                        onClick={onClose} 
                        style={{ 
                            padding: '8px 20px', 
                            borderRadius: 10, 
                            border: '1px solid var(--border)', 
                            backgroundColor: 'var(--bg-subtle)', 
                            color: 'var(--text-muted)', 
                            fontSize: 13, 
                            fontFamily: FD, 
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave} 
                        disabled={saving || !form.recipient_name.trim()}
                        style={{ 
                            padding: '8px 20px', 
                            borderRadius: 10, 
                            border: 'none', 
                            backgroundColor: saving || !form.recipient_name.trim() ? 'var(--bg-muted)' : RED, 
                            color: saving || !form.recipient_name.trim() ? 'var(--text-faint)' : '#fff', 
                            fontSize: 13, 
                            fontFamily: FD, 
                            fontWeight: 700, 
                            cursor: saving || !form.recipient_name.trim() ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
    
    return createPortal(modalContent, document.body);
}

const MyRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [myRequests,   setMyRequests]   = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [currentPage,  setCurrentPage]  = useState(1);
    const [loading,      setLoading]      = useState(true);
    const [filterStatus, setFilterStatus] = useState('');
    const [sortBy,       setSortBy]       = useState('newest');
    const [editReq,      setEditReq]      = useState(null);
    const [toDelete,     setToDelete]     = useState(null);

    const fetchRequests = (page = currentPage) => {
        setLoading(true);
        axiosSecure.get(`/my-request?page=${page - 1}&size=${ITEMS_PER_PAGE}`)
            .then(res => { setMyRequests(res.data.request || []); setTotalRequest(res.data.totalRequest || 0); })
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchRequests(); }, [axiosSecure, currentPage]);

    const handleEdit = (id, data, done) => {
        axiosSecure.patch(`/requests/${id}/status`, data)
            .then(() => { fetchRequests(); setEditReq(null); })
            .catch(() => {})
            .finally(() => done());
    };

    const handleDelete = (id) => {
        axiosSecure.delete(`/requests/${id}`)
            .then(() => { setToDelete(null); fetchRequests(); })
            .catch(() => {});
    };

    const numberOfPages = Math.ceil(totalRequest / ITEMS_PER_PAGE);

    const displayed = myRequests
        .filter(r => !filterStatus || r.donation_status === filterStatus)
        .sort((a, b) => {
            if (sortBy === 'newest')  return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === 'oldest')  return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortBy === 'name_az') return (a.recipient_name||'').localeCompare(b.recipient_name||'');
            if (sortBy === 'name_za') return (b.recipient_name||'').localeCompare(a.recipient_name||'');
            return 0;
        });

    const sel = { padding:'8px 12px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-base)', color:'var(--text-primary)', fontSize:12, fontFamily:FB, outline:'none', cursor:'pointer' };
    const btnBase = { padding:'5px 11px', borderRadius:8, fontSize:11, fontFamily:FD, fontWeight:700, cursor:'pointer', transition:'all 0.12s' };

    return (
        <div style={{ fontFamily:FB }}>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>

            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:20 }}>
                <div>
                    <h1 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(18px,3vw,22px)', color:'var(--text-primary)', margin:0 }}>My Requests</h1>
                    <p style={{ fontSize:13, color:'var(--text-muted)', margin:'4px 0 0' }}>{totalRequest} total request{totalRequest !== 1 ? 's' : ''}</p>
                </div>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={sel}>
                        <option value="">All Statuses</option>
                        {['pending','inprogress','done','cancelled'].map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>
                        ))}
                    </select>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={sel}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="name_az">Name A → Z</option>
                        <option value="name_za">Name Z → A</option>
                    </select>
                </div>
            </div>

            <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden' }}>
                <div style={{ overflowX:'auto' }}>
                    <table style={{ width:'100%', borderCollapse:'collapse', minWidth:640 }}>
                        <thead>
                            <tr style={{ backgroundColor:'rgba(192,7,7,0.06)' }}>
                                {['#','Recipient','Hospital','Blood','District','Status','Actions'].map(h => (
                                    <th key={h} style={{ padding:'13px 16px', textAlign:'left', fontFamily:FD, fontWeight:700, fontSize:11, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--text-muted)', borderBottom:'1px solid var(--border)', whiteSpace:'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_,i) => (
                                    <tr key={i}>
                                        {[1,2,3,4,5,6,7].map(j => (
                                            <td key={j} style={{ padding:'13px 16px' }}>
                                                <div style={{ height:14, borderRadius:6, backgroundColor:'var(--bg-muted)', animation:'pulse 1.5s infinite' }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : displayed.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding:'48px 24px', textAlign:'center', color:'var(--text-muted)', fontSize:14 }}>
                                        <div style={{ fontSize:36, marginBottom:10 }}>📋</div>No requests found
                                    </td>
                                </tr>
                            ) : (
                                displayed.map((req, i) => {
                                    const bc = bloodColors[req.blood_group] || RED;
                                    const sc = statusColors[req.donation_status] || statusColors.pending;
                                    const canEdit = req.donation_status === 'pending';
                                    return (
                                        <tr key={req._id} style={{ borderBottom:'1px solid var(--border)', transition:'background 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor='rgba(192,7,7,0.03)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor='transparent'}
                                        >
                                            <td style={{ padding:'13px 16px', color:'var(--text-faint)', fontSize:13 }}>{(currentPage-1)*ITEMS_PER_PAGE+i+1}</td>
                                            <td style={{ padding:'13px 16px', fontFamily:FD, fontWeight:600, fontSize:13, color:'var(--text-primary)', whiteSpace:'nowrap' }}>{req.recipient_name}</td>
                                            <td style={{ padding:'13px 16px', fontSize:13, color:'var(--text-muted)' }}>{req.hospital_name}</td>
                                            <td style={{ padding:'13px 16px' }}>
                                                <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:8, backgroundColor:bc+'20', color:bc, fontFamily:FD, fontWeight:700, fontSize:12 }}>{req.blood_group}</span>
                                            </td>
                                            <td style={{ padding:'13px 16px', fontSize:13, color:'var(--text-muted)' }}>{req.recipient_district}</td>
                                            <td style={{ padding:'13px 16px' }}>
                                                <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:8, backgroundColor:sc.bg, color:sc.color, fontFamily:FB, fontWeight:600, fontSize:12, textTransform:'capitalize' }}>{req.donation_status}</span>
                                            </td>
                                            <td style={{ padding:'13px 16px' }}>
                                                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                                                    <Link to={`/requests/${req._id}`}
                                                        style={{ ...btnBase, border:'1px solid rgba(19,78,142,0.3)', backgroundColor:'rgba(19,78,142,0.08)', color:'#134E8E', textDecoration:'none', display:'inline-block' }}
                                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor='#134E8E'; e.currentTarget.style.color='#fff'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(19,78,142,0.08)'; e.currentTarget.style.color='#134E8E'; }}
                                                    >View</Link>
                                                    <button onClick={() => canEdit && setEditReq(req)} disabled={!canEdit}
                                                        style={{ ...btnBase, border:`1px solid ${canEdit?'rgba(255,179,63,0.4)':'var(--border)'}`, backgroundColor:canEdit?'rgba(255,179,63,0.12)':'var(--bg-muted)', color:canEdit?'#b45309':'var(--text-faint)', cursor:canEdit?'pointer':'not-allowed' }}
                                                        onMouseEnter={e => { if(canEdit){ e.currentTarget.style.backgroundColor='#FFB33F'; e.currentTarget.style.color='#fff'; }}}
                                                        onMouseLeave={e => { if(canEdit){ e.currentTarget.style.backgroundColor='rgba(255,179,63,0.12)'; e.currentTarget.style.color='#b45309'; }}}
                                                        title={!canEdit?'Can only edit pending requests':''}
                                                    >Edit</button>
                                                    <button onClick={() => setToDelete(req._id)}
                                                        style={{ ...btnBase, border:'1px solid rgba(192,7,7,0.3)', backgroundColor:'rgba(192,7,7,0.08)', color:RED }}
                                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor=RED; e.currentTarget.style.color='#fff'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(192,7,7,0.08)'; e.currentTarget.style.color=RED; }}
                                                    >Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {numberOfPages > 1 && (
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginTop:24, flexWrap:'wrap' }}>
                    <button onClick={() => setCurrentPage(p => Math.max(1,p-1))} disabled={currentPage===1}
                        style={{ padding:'8px 16px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontFamily:FD, fontSize:13, cursor:currentPage===1?'not-allowed':'pointer', opacity:currentPage===1?0.4:1 }}>← Prev</button>
                    {[...Array(numberOfPages).keys()].map(i => (
                        <button key={i} onClick={() => setCurrentPage(i+1)}
                            style={{ width:38, height:38, borderRadius:10, border:`1px solid ${currentPage===i+1?RED:'var(--border)'}`, backgroundColor:currentPage===i+1?RED:'var(--bg-subtle)', color:currentPage===i+1?'#fff':'var(--text-muted)', fontFamily:FD, fontWeight:700, fontSize:13, cursor:'pointer' }}>
                            {i+1}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(p => Math.min(numberOfPages,p+1))} disabled={currentPage===numberOfPages}
                        style={{ padding:'8px 16px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontFamily:FD, fontSize:13, cursor:currentPage===numberOfPages?'not-allowed':'pointer', opacity:currentPage===numberOfPages?0.4:1 }}>Next →</button>
                </div>
            )}

            {editReq && <EditModal req={editReq} onClose={() => setEditReq(null)} onSave={handleEdit} />}

            {toDelete && (
                <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
                    <div style={{ backgroundColor:'var(--bg-base)', borderRadius:16, padding:28, maxWidth:360, width:'100%', border:'1px solid var(--border)', boxShadow:'0 16px 48px rgba(0,0,0,0.25)' }}>
                        <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:16, color:'var(--text-primary)', margin:'0 0 10px' }}>Delete Request?</h3>
                        <p style={{ fontSize:13, color:'var(--text-muted)', margin:'0 0 22px', fontFamily:FB }}>This action cannot be undone.</p>
                        <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
                            <button onClick={() => setToDelete(null)} style={{ padding:'9px 18px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FD, cursor:'pointer' }}>Cancel</button>
                            <button onClick={() => handleDelete(toDelete)} style={{ padding:'9px 18px', borderRadius:10, border:'none', backgroundColor:RED, color:'#fff', fontSize:12, fontFamily:FD, fontWeight:700, cursor:'pointer' }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyRequest;