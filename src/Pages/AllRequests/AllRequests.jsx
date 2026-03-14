// src/Pages/AllRequests/AllRequests.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import useScrollReveal from '../../hooks/useScrollReveal';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const bloodColors = {
  'A+':'#C00707','A-':'#FF4400','B+':'#134E8E','B-':'#0d3d70',
  'O+':'#166534','O-':'#14532d','AB+':'#6b21a8','AB-':'#4a044e',
};

const statusStyle = {
  pending:    { bg:'rgba(192,7,7,0.1)',    color:'#C00707' },
  inprogress: { bg:'rgba(19,78,142,0.12)', color:'#134E8E' },
  done:       { bg:'rgba(22,101,52,0.12)', color:'#166534' },
  cancelled:  { bg:'rgba(100,100,100,0.1)',color:'#888' },
};

function SkeletonCard() {
  return (
    <div style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:18, overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <div style={{ height:160, backgroundColor:'var(--bg-muted)', animation:'pulse 1.5s infinite' }} />
      <div style={{ padding:18, display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ height:14, borderRadius:7, backgroundColor:'var(--bg-muted)', animation:'pulse 1.5s infinite' }} />
        <div style={{ height:12, borderRadius:7, backgroundColor:'var(--bg-muted)', width:'70%', animation:'pulse 1.5s infinite' }} />
        <div style={{ height:12, borderRadius:7, backgroundColor:'var(--bg-muted)', width:'50%', animation:'pulse 1.5s infinite' }} />
        <div style={{ height:36, borderRadius:10, backgroundColor:'var(--bg-muted)', marginTop:4, animation:'pulse 1.5s infinite' }} />
      </div>
    </div>
  );
}

function RequestCard({ req }) {
  const color = bloodColors[req.blood_group] || '#C00707';
  const ss = statusStyle[req.donation_status] || statusStyle.pending;
  return (
    <div style={{
      backgroundColor:'var(--bg-base)', border:'1px solid var(--border)',
      borderRadius:18, overflow:'hidden', display:'flex', flexDirection:'column',
      boxShadow:'var(--shadow-sm)', transition:'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; e.currentTarget.style.borderColor=color+'66'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; e.currentTarget.style.borderColor='var(--border)'; }}
    >
      {/* Card image / blood group hero */}
      <div style={{ height:140, background:`linear-gradient(135deg, ${color}22, ${color}44)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', flexShrink:0 }}>
        <span style={{ fontFamily:FD, fontWeight:900, fontSize:52, color, lineHeight:1, userSelect:'none' }}>{req.blood_group}</span>
        <span style={{ position:'absolute', top:12, right:12, padding:'3px 10px', borderRadius:99, fontSize:10, fontWeight:700, fontFamily:FD, backgroundColor:ss.bg, color:ss.color, textTransform:'capitalize' }}>
          {req.donation_status || 'pending'}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding:'16px 18px', display:'flex', flexDirection:'column', gap:6, flex:1 }}>
        <p style={{ fontFamily:FD, fontWeight:700, fontSize:15, color:'var(--text-primary)', margin:0, lineHeight:1.3 }}>{req.recipient_name}</p>
        <p style={{ fontSize:12, color:'var(--text-muted)', margin:0, fontFamily:FB }}>🏥 {req.hospital_name || 'Hospital not specified'}</p>
        <p style={{ fontSize:12, color:'var(--text-muted)', margin:0, fontFamily:FB }}>📍 {[req.recipient_upazila, req.recipient_district].filter(Boolean).join(', ')}</p>
        {req.donation_date && (
          <p style={{ fontSize:11, color:'var(--text-faint)', margin:0, fontFamily:FB }}>📅 {req.donation_date}</p>
        )}
        <Link to={`/requests/${req._id}`}
          style={{ display:'block', textAlign:'center', marginTop:'auto', paddingTop:10, paddingBottom:10, borderRadius:12, backgroundColor:color, color:'#fff', fontWeight:700, fontSize:12, fontFamily:FD, textDecoration:'none', transition:'opacity 0.15s', marginTop:10 }}
          onMouseEnter={e => e.currentTarget.style.opacity='0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity='1'}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

const ITEMS_PER_PAGE = 12;

const AllRequests = () => {
  const pageRef = useScrollReveal();
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [filterBlood, setFilterBlood] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy]           = useState('newest');
  const [page, setPage]               = useState(1);
  const axiosInstance = useAxios();

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/all-requests')
      .then(res => setAllRequests(res.data || []))
      .catch(() => setAllRequests([]))
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  const filtered = allRequests
    .filter(r => {
      const matchSearch = !search ||
        r.recipient_name?.toLowerCase().includes(search.toLowerCase()) ||
        r.hospital_name?.toLowerCase().includes(search.toLowerCase()) ||
        r.recipient_district?.toLowerCase().includes(search.toLowerCase());
      const matchBlood  = !filterBlood  || r.blood_group === filterBlood;
      const matchStatus = !filterStatus || r.donation_status === filterStatus;
      return matchSearch && matchBlood && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest')  return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest')  return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'name_az') return (a.recipient_name||'').localeCompare(b.recipient_name||'');
      if (sortBy === 'name_za') return (b.recipient_name||'').localeCompare(a.recipient_name||'');
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => setPage(1), [search, filterBlood, filterStatus, sortBy]);

  const selectSt = {
    padding:'9px 12px', borderRadius:10, border:'1px solid var(--border)',
    backgroundColor:'var(--bg-base)', color:'var(--text-primary)',
    fontSize:12, fontFamily:FB, outline:'none', cursor:'pointer',
  };

  return (
    <div ref={pageRef} style={{ backgroundColor:'var(--bg-base)', minHeight:'100vh', fontFamily:FB }}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        .cards-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .cards-grid > * { height:100%; }
        @media(max-width:1100px){ .cards-grid{ grid-template-columns:repeat(3,1fr); } }
        @media(max-width:768px) { .cards-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:480px) { .cards-grid{ grid-template-columns:1fr; } }
      `}</style>

      {/* Header */}
      <section style={{ background:'linear-gradient(135deg,#C00707,#FF4400)', padding:'48px 24px 40px' }}>
        <div className="max-w-7xl mx-auto">
          <h1 data-reveal style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(1.75rem,4vw,2.75rem)', color:'#fff', margin:'0 0 8px' }}>
            Blood Requests
          </h1>
          <p data-reveal data-reveal-delay="100" style={{ color:'rgba(255,255,255,0.8)', margin:0, fontFamily:FB }}>
            Find and respond to urgent blood donation requests across Bangladesh
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ backgroundColor:'var(--bg-subtle)', borderBottom:'1px solid var(--border)', padding:'14px 24px', position:'sticky', top:64, zIndex:20 }}>
        <div className="max-w-7xl mx-auto" style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
          <div style={{ position:'relative', flex:'1', minWidth:180, maxWidth:280 }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:13, pointerEvents:'none' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, hospital, district..."
              style={{ ...selectSt, paddingLeft:32, width:'100%', boxSizing:'border-box' }}
              onFocus={e => e.target.style.borderColor='#C00707'}
              onBlur={e => e.target.style.borderColor='var(--border)'}
            />
          </div>
          <select value={filterBlood} onChange={e => setFilterBlood(e.target.value)} style={selectSt}>
            <option value="">All Blood Groups</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectSt}>
            <option value="">All Statuses</option>
            {['pending','inprogress','done','cancelled'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectSt}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name_az">Name A → Z</option>
            <option value="name_za">Name Z → A</option>
          </select>
          <span style={{ fontSize:12, color:'var(--text-faint)', marginLeft:'auto', fontFamily:FB, whiteSpace:'nowrap' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto" style={{ padding:'32px 24px' }}>
        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }} className="cards-grid">
            {[...Array(8)].map((_,i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginated.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 20px' }}>
            <div style={{ fontSize:52, marginBottom:12 }}>🩸</div>
            <p style={{ fontFamily:FD, fontWeight:700, fontSize:17, color:'var(--text-muted)', margin:'0 0 6px' }}>No requests found</p>
            <p style={{ fontSize:13, color:'var(--text-faint)' }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }} className="cards-grid">
            {paginated.map((req, i) => <RequestCard key={req._id || i} req={req} />)}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:36, flexWrap:'wrap' }}>
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
              style={{ padding:'8px 16px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:13, fontFamily:FD, cursor:'pointer', opacity:page===1?0.4:1 }}>
              ← Prev
            </button>
            {[...Array(Math.min(totalPages, 7))].map((_,i) => {
              const pg = totalPages <= 7 ? i+1 : i+1;
              return (
                <button key={i} onClick={() => setPage(pg)}
                  style={{ width:36, height:36, borderRadius:10, border:`1px solid ${page===pg?'#C00707':'var(--border)'}`, backgroundColor:page===pg?'#C00707':'var(--bg-subtle)', color:page===pg?'#fff':'var(--text-muted)', fontSize:13, fontFamily:FD, cursor:'pointer', fontWeight:page===pg?700:400 }}>
                  {pg}
                </button>
              );
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
              style={{ padding:'8px 16px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:13, fontFamily:FD, cursor:'pointer', opacity:page===totalPages?0.4:1 }}>
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;