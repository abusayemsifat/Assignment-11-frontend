// src/Pages/Dashboard/ManageRequests/ManageRequests.jsx
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";
const RED = '#C00707';

const bloodColors = { 'A+':'#C00707','A-':'#FF4400','B+':'#134E8E','B-':'#0d3d70','O+':'#166534','O-':'#14532d','AB+':'#6b21a8','AB-':'#4a044e' };
const statusOptions = ['pending','inprogress','done','cancelled'];
const statusColors = {
  pending:    { bg:'rgba(192,7,7,0.1)',    color:'#C00707' },
  inprogress: { bg:'rgba(19,78,142,0.12)', color:'#134E8E' },
  done:       { bg:'rgba(22,101,52,0.12)', color:'#166534' },
  cancelled:  { bg:'rgba(100,100,100,0.1)',color:'#888'    },
};

const PER = 10;

export default function ManageRequests() {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [filterS,  setFilterS]  = useState('');
  const [page,     setPage]     = useState(1);
  const [toDelete, setToDelete] = useState(null);
  const [sortKey, setSortKey]   = useState('createdAt');
  const [sortDir, setSortDir]   = useState('desc');

  const fetch = () => {
    setLoading(true);
    axiosSecure.get('/all-requests').then(r => setRequests(r.data||[])).catch(()=>{}).finally(()=>setLoading(false));
  };
  useEffect(fetch, [axiosSecure]);
  useEffect(()=>setPage(1),[search,filterS]);

  const changeStatus = (id, s) => {
    axiosSecure.patch(`/requests/${id}/status`, { donation_status: s })
      .then(()=>setRequests(p=>p.map(r=>r._id===id?{...r,donation_status:s}:r)))
      .catch(e=>console.log(e));
  };
  const doDelete = (id) => {
    axiosSecure.delete(`/requests/${id}`).then(()=>{setRequests(p=>p.filter(r=>r._id!==id));setToDelete(null);}).catch(e=>console.log(e));
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = requests
    .filter(r => {
      const s = !search || r.recipient_name?.toLowerCase().includes(search.toLowerCase()) || r.hospital_name?.toLowerCase().includes(search.toLowerCase());
      return s && (!filterS || r.donation_status===filterS);
    })
    .sort((a, b) => {
      const av = sortKey === 'createdAt' ? new Date(a.createdAt||0) : (a[sortKey]||'').toLowerCase();
      const bv = sortKey === 'createdAt' ? new Date(b.createdAt||0) : (b[sortKey]||'').toLowerCase();
      if (sortKey === 'createdAt') return sortDir === 'desc' ? bv - av : av - bv;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  const pages    = Math.max(1,Math.ceil(filtered.length/PER));
  const paginated= filtered.slice((page-1)*PER, page*PER);

  return (
    <div style={{ fontFamily: FB, color: 'var(--text-primary)' }}>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontFamily:FD, fontWeight:800, fontSize:20, color:'var(--text-primary)', margin:'0 0 3px' }}>Manage Requests</h1>
        <p style={{ fontSize:13, color:'var(--text-muted)', margin:0 }}>{requests.length} total blood requests</p>
      </div>

      <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:16, alignItems:'center' }}>
        <div style={{ position:'relative', flex:1, minWidth:200, maxWidth:320 }}>
          <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:13, pointerEvents:'none' }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search requests…"
            style={{ paddingLeft:34, paddingRight:12, paddingTop:9, paddingBottom:9, borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-base)', color:'var(--text-primary)', fontSize:12, fontFamily:FB, outline:'none', width:'100%', boxSizing:'border-box' }}
            onFocus={e=>e.target.style.borderColor=RED} onBlur={e=>e.target.style.borderColor='var(--border)'} />
        </div>
        <select value={filterS} onChange={e=>setFilterS(e.target.value)}
          style={{ padding:'9px 12px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-base)', color:'var(--text-primary)', fontSize:12, fontFamily:FB, outline:'none' }}>
          <option value="">All Statuses</option>
          {statusOptions.map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
        <span style={{ fontSize:12, color:'var(--text-faint)', fontFamily:FB }}>{filtered.length} result{filtered.length!==1?'s':''}</span>
      </div>

      <div style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', boxShadow:'var(--shadow-sm)' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                {[
                  { label:'#',         key:null },
                  { label:'Recipient', key:'recipient_name' },
                  { label:'Requester', key:'requester_name' },
                  { label:'Hospital',  key:'hospital_name' },
                  { label:'Blood',     key:'blood_group' },
                  { label:'Status',    key:'donation_status' },
                  { label:'Action',    key:null },
                ].map(({ label, key }) => (
                  <th key={label} onClick={() => key && handleSort(key)}
                    style={{ padding:'11px 14px', textAlign:'left', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, color: sortKey===key ? '#C00707' : 'var(--text-muted)', fontFamily:FD, backgroundColor:'var(--bg-subtle)', borderBottom:'1px solid var(--border)', whiteSpace:'nowrap', cursor: key ? 'pointer' : 'default', userSelect:'none' }}>
                    {label} {key && sortKey===key ? (sortDir==='asc'?'↑':'↓') : (key?'↕':'')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_,i)=>(
                  <tr key={i}>{[...Array(7)].map((_,j)=>(
                    <td key={j} style={{ padding:'12px 14px' }}><div style={{ height:13, borderRadius:7, backgroundColor:'var(--bg-muted)', animation:'pulse 1.5s infinite' }}/></td>
                  ))}</tr>
                ))
                : paginated.length===0
                  ? <tr><td colSpan={7} style={{ padding:'48px 20px', textAlign:'center', color:'var(--text-faint)', fontFamily:FB }}>No requests found</td></tr>
                  : paginated.map((r,i)=>{
                    const sc=statusColors[r.donation_status]||statusColors.pending;
                    const bc=bloodColors[r.blood_group];
                    return (
                      <tr key={r._id||i} style={{ borderBottom:'1px solid var(--border)' }}
                        onMouseEnter={e=>e.currentTarget.style.backgroundColor='var(--bg-subtle)'}
                        onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
                      >
                        <td style={{ padding:'11px 14px', fontSize:12, color:'var(--text-faint)' }}>{(page-1)*PER+i+1}</td>
                        <td style={{ padding:'11px 14px', fontFamily:FD, fontWeight:600, fontSize:13, color:'var(--text-primary)', whiteSpace:'nowrap' }}>{r.recipient_name}</td>
                        <td style={{ padding:'11px 14px', fontSize:12, color:'var(--text-muted)' }}>{r.requester_name}</td>
                        <td style={{ padding:'11px 14px', fontSize:12, color:'var(--text-muted)' }}>{r.hospital_name}</td>
                        <td style={{ padding:'11px 14px' }}>
                          <span style={{ display:'inline-block', padding:'2px 9px', borderRadius:99, fontSize:11, fontWeight:800, fontFamily:FD, backgroundColor:bc?bc+'22':'var(--bg-muted)', color:bc||'var(--text-primary)' }}>{r.blood_group}</span>
                        </td>
                        <td style={{ padding:'11px 14px' }}>
                          <select value={r.donation_status||'pending'} onChange={e=>changeStatus(r._id,e.target.value)}
                            style={{ padding:'3px 8px', borderRadius:8, border:`1px solid ${sc.color}40`, backgroundColor:sc.bg, color:sc.color, fontSize:11, fontFamily:FD, fontWeight:700, cursor:'pointer', outline:'none' }}>
                            {statusOptions.map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                          </select>
                        </td>
                        <td style={{ padding:'11px 14px' }}>
                          <button onClick={()=>setToDelete(r._id)}
                            style={{ padding:'5px 11px', borderRadius:8, border:'1px solid rgba(192,7,7,0.3)', backgroundColor:'rgba(192,7,7,0.08)', color:RED, fontSize:11, fontFamily:FD, fontWeight:700, cursor:'pointer', transition:'all 0.12s' }}
                            onMouseEnter={e=>{ e.currentTarget.style.backgroundColor=RED; e.currentTarget.style.color='#fff'; }}
                            onMouseLeave={e=>{ e.currentTarget.style.backgroundColor='rgba(192,7,7,0.08)'; e.currentTarget.style.color=RED; }}
                          >Delete</button>
                        </td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
      </div>

      {!loading && pages>1 && (
        <div style={{ display:'flex', justifyContent:'center', gap:7, marginTop:18, flexWrap:'wrap' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{ padding:'7px 13px', borderRadius:9, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FD, cursor:'pointer', opacity:page===1?0.4:1 }}>← Prev</button>
          {[...Array(pages)].map((_,i)=>(
            <button key={i} onClick={()=>setPage(i+1)} style={{ width:34, height:34, borderRadius:9, border:`1px solid ${page===i+1?RED:'var(--border)'}`, backgroundColor:page===i+1?RED:'var(--bg-subtle)', color:page===i+1?'#fff':'var(--text-muted)', fontSize:12, fontFamily:FD, cursor:'pointer' }}>{i+1}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages} style={{ padding:'7px 13px', borderRadius:9, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FD, cursor:'pointer', opacity:page===pages?0.4:1 }}>Next →</button>
        </div>
      )}

      {toDelete && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
          <div style={{ backgroundColor:'var(--bg-base)', borderRadius:16, padding:28, maxWidth:360, width:'100%', border:'1px solid var(--border)', boxShadow:'var(--shadow-md)' }}>
            <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:16, color:'var(--text-primary)', margin:'0 0 10px' }}>Delete Request?</h3>
            <p style={{ fontSize:13, color:'var(--text-muted)', margin:'0 0 22px', fontFamily:FB }}>This action cannot be undone.</p>
            <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
              <button onClick={()=>setToDelete(null)} style={{ padding:'9px 18px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FD, cursor:'pointer' }}>Cancel</button>
              <button onClick={()=>doDelete(toDelete)} style={{ padding:'9px 18px', borderRadius:10, border:'none', backgroundColor:RED, color:'#fff', fontSize:12, fontFamily:FD, fontWeight:700, cursor:'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}