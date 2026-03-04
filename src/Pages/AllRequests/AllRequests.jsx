// src/Pages/AllRequests/AllRequests.jsx
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import useScrollReveal from '../../hooks/useScrollReveal';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";

const bloodColors = {
  'A+':'#C00707','A-':'#FF4400','B+':'#134E8E','B-':'#0d3d70',
  'O+':'#166534','O-':'#14532d','AB+':'#6b21a8','AB-':'#4a044e',
};

function SkeletonRow() {
  return (
    <tr>
      {[1,2,3,4].map(i => (
        <td key={i} style={{ padding:'14px 16px' }}>
          <div style={{ height:14, borderRadius:8, backgroundColor:'var(--bg-muted)', animation:'pulse 1.5s infinite' }} />
        </td>
      ))}
    </tr>
  );
}

const ITEMS_PER_PAGE = 10;

const AllRequests = () => {
  const pageRef = useScrollReveal();
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [filterBlood, setFilterBlood] = useState('');
  const [page, setPage]               = useState(1);
  const axiosInstance = useAxios();

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/all-requests')
      .then(res => setAllRequests(res.data || []))
      .catch(() => setAllRequests([]))
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  const filtered = allRequests.filter(r => {
    const matchSearch = !search ||
      r.recipient_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.hospital_name?.toLowerCase().includes(search.toLowerCase());
    const matchBlood = !filterBlood || r.blood_group === filterBlood;
    return matchSearch && matchBlood;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => setPage(1), [search, filterBlood]);

  return (
    <div ref={pageRef} style={{ backgroundColor:'var(--bg-base)', minHeight:'100vh', fontFamily:FONT_BODY }}>

      {/* Header */}
      <section style={{ background:'linear-gradient(135deg,#C00707,#FF4400)', padding:'48px 24px 40px' }}>
        <div className="max-w-7xl mx-auto">
          <h1 data-reveal style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:'clamp(1.75rem,4vw,2.75rem)', color:'#fff', margin:'0 0 8px' }}>
            Blood Requests
          </h1>
          <p data-reveal data-reveal-delay="100" style={{ color:'rgba(255,255,255,0.8)', fontFamily:FONT_BODY, margin:0 }}>
            Find urgent blood requests across Bangladesh
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ backgroundColor:'var(--bg-subtle)', borderBottom:'1px solid var(--border)', padding:'16px 24px', position:'sticky', top:64, zIndex:20 }}>
        <div className="max-w-7xl mx-auto" style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
          {/* Search */}
          <div style={{ position:'relative', flex:'1', minWidth:200, maxWidth:320 }}>
            <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:14 }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or hospital..."
              style={{
                width:'100%', paddingLeft:36, paddingRight:12, paddingTop:10, paddingBottom:10,
                borderRadius:10, border:'1px solid var(--border)', fontSize:13,
                backgroundColor:'var(--bg-base)', color:'var(--text-primary)', fontFamily:FONT_BODY, outline:'none',
              }}
              onFocus={e => e.target.style.borderColor = '#C00707'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Blood group filter */}
          <select value={filterBlood} onChange={e => setFilterBlood(e.target.value)}
            style={{
              padding:'10px 14px', borderRadius:10, border:'1px solid var(--border)',
              backgroundColor:'var(--bg-base)', color:'var(--text-primary)',
              fontSize:13, fontFamily:FONT_BODY, outline:'none', cursor:'pointer',
            }}>
            <option value="">All Blood Groups</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          <span style={{ fontSize:12, color:'var(--text-faint)', fontFamily:FONT_BODY, marginLeft:'auto' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Table */}
      <div className="max-w-7xl mx-auto" style={{ padding:'32px 24px' }}>
        <div style={{ borderRadius:16, overflow:'hidden', border:'1px solid var(--border)', boxShadow:'var(--shadow-sm)' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:FONT_BODY }}>
              <thead>
                <tr style={{ backgroundColor:'var(--bg-subtle)', borderBottom:'1px solid var(--border)' }}>
                  {['#','Recipient Name','Hospital','Location','Blood Group','Status'].map(h => (
                    <th key={h} style={{
                      padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700,
                      textTransform:'uppercase', letterSpacing:1, color:'var(--text-muted)', fontFamily:FONT_DISPLAY,
                      whiteSpace:'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
                  : paginated.length === 0
                    ? (
                      <tr>
                        <td colSpan={6} style={{ padding:'60px 20px', textAlign:'center', color:'var(--text-faint)', fontFamily:FONT_BODY }}>
                          <div style={{ fontSize:40, marginBottom:8 }}>🩸</div>
                          <p style={{ fontFamily:FONT_DISPLAY, fontWeight:600, fontSize:16, color:'var(--text-muted)', margin:'0 0 4px' }}>No requests found</p>
                          <p style={{ fontSize:13 }}>Try adjusting your search or filter</p>
                        </td>
                      </tr>
                    )
                    : paginated.map((req, i) => (
                      <tr key={req._id || i}
                        style={{ borderBottom:'1px solid var(--border)', transition:'background 0.1s' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding:'14px 16px', color:'var(--text-faint)', fontSize:13 }}>
                          {(page - 1) * ITEMS_PER_PAGE + i + 1}
                        </td>
                        <td style={{ padding:'14px 16px', fontWeight:600, color:'var(--text-primary)', fontSize:14, fontFamily:FONT_DISPLAY }}>{req.recipient_name}</td>
                        <td style={{ padding:'14px 16px', color:'var(--text-muted)', fontSize:13 }}>{req.hospital_name}</td>
                        <td style={{ padding:'14px 16px', color:'var(--text-muted)', fontSize:13 }}>
                          {[req.recipient_upazila, req.recipient_district].filter(Boolean).join(', ')}
                        </td>
                        <td style={{ padding:'14px 16px' }}>
                          <span style={{
                            display:'inline-block', padding:'3px 10px', borderRadius:99,
                            fontSize:12, fontWeight:800, fontFamily:FONT_DISPLAY,
                            backgroundColor: bloodColors[req.blood_group] ? bloodColors[req.blood_group] + '22' : 'var(--bg-muted)',
                            color: bloodColors[req.blood_group] || 'var(--text-primary)',
                            border: `1px solid ${bloodColors[req.blood_group] || 'var(--border)'}40`,
                          }}>{req.blood_group}</span>
                        </td>
                        <td style={{ padding:'14px 16px' }}>
                          <span style={{
                            display:'inline-block', padding:'3px 10px', borderRadius:99,
                            fontSize:11, fontWeight:600, fontFamily:FONT_DISPLAY,
                            backgroundColor: req.donation_status === 'done' ? 'rgba(22,101,52,0.12)' : req.donation_status === 'inprogress' ? 'rgba(19,78,142,0.12)' : 'rgba(192,7,7,0.1)',
                            color: req.donation_status === 'done' ? '#166534' : req.donation_status === 'inprogress' ? '#134E8E' : '#C00707',
                          }}>
                            {req.donation_status || 'pending'}
                          </span>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:28, flexWrap:'wrap' }}>
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
              style={{ padding:'8px 16px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:13, fontFamily:FONT_DISPLAY, cursor:'pointer', opacity: page===1 ? 0.4 : 1 }}>
              ← Prev
            </button>
            {[...Array(totalPages)].map((_,i) => (
              <button key={i} onClick={() => setPage(i+1)}
                style={{ width:36, height:36, borderRadius:10, border:`1px solid ${page===i+1 ? '#C00707' : 'var(--border)'}`, backgroundColor: page===i+1 ? '#C00707' : 'var(--bg-subtle)', color: page===i+1 ? '#fff' : 'var(--text-muted)', fontSize:13, fontFamily:FONT_DISPLAY, cursor:'pointer', fontWeight: page===i+1 ? 700 : 400 }}>
                {i+1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
              style={{ padding:'8px 16px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:13, fontFamily:FONT_DISPLAY, cursor:'pointer', opacity: page===totalPages ? 0.4 : 1 }}>
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;