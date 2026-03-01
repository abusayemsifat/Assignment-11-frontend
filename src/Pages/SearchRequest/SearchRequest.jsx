import axios from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";

const bloodColors = {
  'A+':'#C00707','A-':'#FF4400','B+':'#134E8E','B-':'#0d3d70',
  'O+':'#166534','O-':'#14532d','AB+':'#6b21a8','AB-':'#4a044e',
};

const selectStyle = {
  width:'100%', padding:'11px 14px', borderRadius:12,
  border:'1px solid var(--border)', fontSize:13,
  backgroundColor:'var(--bg-base)', color:'var(--text-primary)',
  fontFamily:FONT_BODY, outline:'none', cursor:'pointer',
};

const labelStyle = {
  display:'block', marginBottom:6, fontSize:12, fontWeight:700,
  color:'var(--text-muted)', fontFamily:FONT_DISPLAY,
  textTransform:'uppercase', letterSpacing:0.5,
};

function ResultCard({ s }) {
  const color = bloodColors[s.blood_group] || '#C00707';
  return (
    <div style={{
      backgroundColor:'var(--bg-base)', border:'1px solid var(--border)',
      borderRadius:16, padding:22, display:'flex', flexDirection:'column', gap:10,
      boxShadow:'var(--shadow-sm)', transition:'all 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{
          fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:28, color,
          lineHeight:1,
        }}>{s.blood_group}</span>
        <span style={{ fontSize:11, color:'var(--text-faint)', fontFamily:FONT_BODY }}>Available</span>
      </div>
      <div style={{ borderTop:'1px solid var(--border)', paddingTop:10 }}>
        <p style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:15, color:'var(--text-primary)', margin:'0 0 4px' }}>{s.recipient_name}</p>
        <p style={{ fontSize:12, color:'var(--text-muted)', margin:'0 0 2px', fontFamily:FONT_BODY }}>📍 {s.recipient_district}, {s.recipient_upazila}</p>
        {s.hospital_name && <p style={{ fontSize:12, color:'var(--text-muted)', margin:0, fontFamily:FONT_BODY }}>🏥 {s.hospital_name}</p>}
      </div>
      <Link to="/all-requests" style={{
        display:'block', textAlign:'center', padding:'9px 0', borderRadius:10,
        backgroundColor: color, color:'#fff', fontWeight:700, fontSize:12,
        textDecoration:'none', fontFamily:FONT_DISPLAY, marginTop:4, transition:'opacity 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >View Request</Link>
    </div>
  );
}

const SearchRequest = () => {
  const [upazilas, setUpazilas]   = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict]   = useState('');
  const [upazila, setUpazila]     = useState('');
  const [results, setResults]     = useState([]);
  const [searched, setSearched]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get('/upazila.json').then(r => setUpazilas(r.data.upazilas)).catch(()=>{});
    axios.get('/district.json').then(r => setDistricts(r.data.districts)).catch(()=>{});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;
    setLoading(true);
    axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
      .then(res => { setResults(res.data); setSearched(true); })
      .catch(() => { setResults([]); setSearched(true); })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ backgroundColor:'var(--bg-base)', minHeight:'100vh', fontFamily:FONT_BODY }}>

      {/* Header */}
      <section style={{ background:'linear-gradient(135deg,#C00707,#FF4400)', padding:'48px 24px 40px' }}>
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:'clamp(1.75rem,4vw,2.75rem)', color:'#fff', margin:'0 0 8px' }}>
            Find Donors
          </h1>
          <p style={{ color:'rgba(255,255,255,0.8)', fontFamily:FONT_BODY, margin:0 }}>
            Search for blood donors by type, district, and upazila
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section style={{ backgroundColor:'var(--bg-subtle)', padding:'32px 24px', borderBottom:'1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSearch}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16, alignItems:'flex-end' }}>

              <div>
                <label style={labelStyle}>Blood Group *</label>
                <select name="blood" required style={selectStyle}
                  onFocus={e => e.target.style.borderColor = '#C00707'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                >
                  <option value="" disabled>Select blood group</option>
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>District</label>
                <select value={district} onChange={e => setDistrict(e.target.value)} style={selectStyle}
                  onFocus={e => e.target.style.borderColor = '#C00707'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                >
                  <option value="">All Districts</option>
                  {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Upazila</label>
                <select value={upazila} onChange={e => setUpazila(e.target.value)} style={selectStyle}
                  onFocus={e => e.target.style.borderColor = '#C00707'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                >
                  <option value="">All Upazilas</option>
                  {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                </select>
              </div>

              <div>
                <button type="submit" disabled={loading}
                  style={{
                    width:'100%', padding:'11px 20px', borderRadius:12,
                    backgroundColor:'#C00707', color:'#fff',
                    fontWeight:700, fontSize:14, fontFamily:FONT_DISPLAY,
                    border:'none', cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1, transition:'background 0.15s',
                  }}
                  onMouseEnter={e => { if(!loading) e.currentTarget.style.backgroundColor = '#A00606'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C00707'; }}
                >
                  {loading ? '⏳ Searching...' : '🔍 Search Donors'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      <div className="max-w-7xl mx-auto" style={{ padding:'36px 24px' }}>
        {!searched && !loading && (
          <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-faint)' }}>
            <div style={{ fontSize:56, marginBottom:12 }}>🩸</div>
            <p style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:17, color:'var(--text-muted)', margin:'0 0 4px' }}>Search for donors above</p>
            <p style={{ fontSize:13, fontFamily:FONT_BODY }}>Select a blood group and click Search to find available donors</p>
          </div>
        )}

        {loading && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:18 }}>
            {[...Array(6)].map((_,i) => (
              <div key={i} style={{ backgroundColor:'var(--bg-subtle)', borderRadius:16, height:200, border:'1px solid var(--border)', animation:'pulse 1.5s infinite' }} />
            ))}
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <div style={{ fontSize:56, marginBottom:12 }}>😔</div>
            <p style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:17, color:'var(--text-muted)', margin:'0 0 4px' }}>No donors found</p>
            <p style={{ fontSize:13, color:'var(--text-faint)', fontFamily:FONT_BODY }}>Try a different blood group or location</p>
          </div>
        )}

        {searched && !loading && results.length > 0 && (
          <>
            <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:20, fontFamily:FONT_BODY }}>
              Found <strong style={{ color:'var(--text-primary)', fontFamily:FONT_DISPLAY }}>{results.length}</strong> donor{results.length !== 1 ? 's' : ''}
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:18 }}>
              {results.map((s, i) => <ResultCard key={s._id || i} s={s} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchRequest;