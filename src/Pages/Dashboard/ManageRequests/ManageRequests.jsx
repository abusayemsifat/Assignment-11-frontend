import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";

const bloodColors = {
  'A+':'#C00707','A-':'#FF4400','B+':'#134E8E','B-':'#0d3d70',
  'O+':'#166534','O-':'#14532d','AB+':'#6b21a8','AB-':'#4a044e',
};

const statusOptions = ['pending', 'inprogress', 'done', 'cancelled'];
const statusColors = {
  pending:    { bg:'rgba(192,7,7,0.1)',    color:'#C00707' },
  inprogress: { bg:'rgba(19,78,142,0.12)', color:'#134E8E' },
  done:       { bg:'rgba(22,101,52,0.12)', color:'#166534' },
  cancelled:  { bg:'rgba(100,100,100,0.1)',color:'#666' },
};

const ITEMS_PER_PAGE = 10;

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage]           = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchAll = () => {
    setLoading(true);
    axiosSecure.get('/all-requests')
      .then(res => setRequests(res.data || []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, [axiosSecure]);

  const handleStatusChange = (id, newStatus) => {
    axiosSecure.patch(`/requests/${id}/status`, { donation_status: newStatus })
      .then(() => setRequests(prev => prev.map(r => r._id === id ? { ...r, donation_status: newStatus } : r)))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axiosSecure.delete(`/requests/${id}`)
      .then(() => { setRequests(prev => prev.filter(r => r._id !== id)); setConfirmDelete(null); })
      .catch(err => console.log(err));
  };

  const filtered = requests.filter(r => {
    const matchSearch = !search ||
      r.recipient_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.requester_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.hospital_name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || r.donation_status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((page-1)*ITEMS_PER_PAGE, page*ITEMS_PER_PAGE);

  useEffect(() => setPage(1), [search, filterStatus]);

  return (
    <div style={{ fontFamily:FONT_BODY }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28, flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:22, color:'var(--text-primary)', margin:'0 0 4px' }}>Manage Requests</h1>
          <p style={{ fontSize:13, color:'var(--text-muted)', margin:0, fontFamily:FONT_BODY }}>{requests.length} total blood requests</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:20, alignItems:'center' }}>
        <div style={{ position:'relative', flex:1, minWidth:200, maxWidth:300 }}>
          <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:13 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search requests..."
            style={{ width:'100%', paddingLeft:34, paddingRight:12, paddingTop:9, paddingBottom:9, borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-base)', color:'var(--text-primary)', fontSize:12, fontFamily:FONT_BODY, outline:'none', boxSizing:'border-box' }}
            onFocus={e => e.target.style.borderColor='#C00707'} onBlur={e => e.target.style.borderColor='var(--border)'}
          />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          style={{ padding:'9px 12px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-base)', color:'var(--text-primary)', fontSize:12, fontFamily:FONT_BODY, outline:'none', cursor:'pointer' }}>
          <option value="">All Statuses</option>
          {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
        <span style={{ fontSize:12, color:'var(--text-faint)', fontFamily:FONT_BODY }}>{filtered.length} result{filtered.length!==1?'s':''}</span>
      </div>

      {/* Table */}
      <div style={{ borderRadius:14, overflow:'hidden', border:'1px solid var(--border)' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:FONT_BODY }}>
            <thead>
              <tr style={{ backgroundColor:'var(--bg-subtle)', borderBottom:'1px solid var(--border)' }}>
                {['#','Recipient','Requester','Hospital','Blood','Status','Actions'].map(h => (
                  <th key={h} style={{ padding:'11px 14px', textAlign:'left', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, color:'var(--text-muted)', fontFamily:FONT_DISPLAY, whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_,i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} style={{ padding:'13px 14px' }}>
                        <div style={{ height:13, borderRadius:7, backgroundColor:'var(--bg-muted)', animation:'pulse 1.5s infinite' }} />
                      </td>
                    ))}
                  </tr>
                ))
                : paginated.length === 0
                  ? <tr><td colSpan={7} style={{ padding:'50px 20px', textAlign:'center', color:'var(--text-faint)', fontFamily:FONT_BODY }}>No requests found</td></tr>
                  : paginated.map((req, i) => {
                    const sc = statusColors[req.donation_status] || statusColors.pending;
                    const bc = bloodColors[req.blood_group];
                    return (
                      <tr key={req._id} style={{ borderBottom:'1px solid var(--border)' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor='var(--bg-subtle)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor='transparent'}
                      >
                        <td style={{ padding:'12px 14px', fontSize:12, color:'var(--text-faint)' }}>{(page-1)*ITEMS_PER_PAGE+i+1}</td>
                        <td style={{ padding:'12px 14px', fontWeight:600, color:'var(--text-primary)', fontSize:13, fontFamily:FONT_DISPLAY }}>{req.recipient_name}</td>
                        <td style={{ padding:'12px 14px', fontSize:12, color:'var(--text-muted)' }}>{req.requester_name}</td>
                        <td style={{ padding:'12px 14px', fontSize:12, color:'var(--text-muted)' }}>{req.hospital_name}</td>
                        <td style={{ padding:'12px 14px' }}>
                          <span style={{ display:'inline-block', padding:'2px 9px', borderRadius:99, fontSize:11, fontWeight:800, fontFamily:FONT_DISPLAY, backgroundColor: bc ? bc+'22' : 'var(--bg-muted)', color: bc || 'var(--text-primary)' }}>{req.blood_group}</span>
                        </td>
                        <td style={{ padding:'12px 14px' }}>
                          <select value={req.donation_status || 'pending'}
                            onChange={e => handleStatusChange(req._id, e.target.value)}
                            style={{ padding:'4px 8px', borderRadius:8, border:`1px solid ${sc.color}40`, backgroundColor: sc.bg, color: sc.color, fontSize:11, fontFamily:FONT_DISPLAY, fontWeight:700, cursor:'pointer', outline:'none' }}>
                            {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                          </select>
                        </td>
                        <td style={{ padding:'12px 14px' }}>
                          <div style={{ display:'flex', gap:6 }}>
                            <button onClick={() => setConfirmDelete(req._id)}
                              style={{ padding:'5px 12px', borderRadius:8, border:'1px solid rgba(192,7,7,0.3)', backgroundColor:'rgba(192,7,7,0.08)', color:'#C00707', fontSize:11, fontFamily:FONT_DISPLAY, fontWeight:700, cursor:'pointer', transition:'all 0.15s' }}
                              onMouseEnter={e => { e.currentTarget.style.backgroundColor='#C00707'; e.currentTarget.style.color='#fff'; }}
                              onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(192,7,7,0.08)'; e.currentTarget.style.color='#C00707'; }}
                            >Delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:20, flexWrap:'wrap' }}>
          <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
            style={{ padding:'7px 14px', borderRadius:9, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FONT_DISPLAY, cursor:'pointer', opacity:page===1?0.4:1 }}>← Prev</button>
          {[...Array(totalPages)].map((_,i) => (
            <button key={i} onClick={() => setPage(i+1)}
              style={{ width:34, height:34, borderRadius:9, border:`1px solid ${page===i+1?'#C00707':'var(--border)'}`, backgroundColor:page===i+1?'#C00707':'var(--bg-subtle)', color:page===i+1?'#fff':'var(--text-muted)', fontSize:12, fontFamily:FONT_DISPLAY, cursor:'pointer' }}>{i+1}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
            style={{ padding:'7px 14px', borderRadius:9, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FONT_DISPLAY, cursor:'pointer', opacity:page===totalPages?0.4:1 }}>Next →</button>
        </div>
      )}

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
          <div style={{ backgroundColor:'var(--bg-base)', borderRadius:16, padding:28, maxWidth:380, width:'100%', border:'1px solid var(--border)' }}>
            <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:17, color:'var(--text-primary)', margin:'0 0 10px' }}>Delete Request?</h3>
            <p style={{ fontSize:13, color:'var(--text-muted)', margin:'0 0 22px', fontFamily:FONT_BODY }}>This action cannot be undone. The request will be permanently removed.</p>
            <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ padding:'9px 20px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:13, fontFamily:FONT_DISPLAY, cursor:'pointer' }}>Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} style={{ padding:'9px 20px', borderRadius:10, border:'none', backgroundColor:'#C00707', color:'#fff', fontSize:13, fontFamily:FONT_DISPLAY, fontWeight:700, cursor:'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRequests;