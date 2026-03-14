// src/Pages/RequestDetail/RequestDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import useScrollReveal from '../../hooks/useScrollReveal';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const bloodColors = {
  'A+':'#C00707','A-':'#FF4400','B+':'#134E8E','B-':'#0d3d70',
  'O+':'#166534','O-':'#14532d','AB+':'#6b21a8','AB-':'#4a044e',
};

const statusStyle = {
  pending:    { bg:'rgba(192,7,7,0.1)',    color:'#C00707',  label:'Pending' },
  inprogress: { bg:'rgba(19,78,142,0.12)', color:'#134E8E',  label:'In Progress' },
  done:       { bg:'rgba(22,101,52,0.12)', color:'#166534',  label:'Fulfilled' },
  cancelled:  { bg:'rgba(100,100,100,0.1)',color:'#888',     label:'Cancelled' },
};

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
      <span style={{ fontSize:18, lineHeight:1, flexShrink:0, marginTop:1 }}>{icon}</span>
      <div>
        <p style={{ fontFamily:FD, fontWeight:700, fontSize:11, color:'var(--text-faint)', margin:'0 0 2px', textTransform:'uppercase', letterSpacing:0.5 }}>{label}</p>
        <p style={{ fontFamily:FB, fontSize:14, color:'var(--text-primary)', margin:0 }}>{value}</p>
      </div>
    </div>
  );
}

function RelatedCard({ req }) {
  const color = bloodColors[req.blood_group] || '#C00707';
  return (
    <Link to={`/requests/${req._id}`} style={{ textDecoration:'none' }}>
      <div style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', transition:'all 0.18s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor=color+'66'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
      >
        <div style={{ height:80, background:`linear-gradient(135deg,${color}22,${color}44)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontFamily:FD, fontWeight:900, fontSize:32, color }}>{req.blood_group}</span>
        </div>
        <div style={{ padding:'12px 14px' }}>
          <p style={{ fontFamily:FD, fontWeight:700, fontSize:13, color:'var(--text-primary)', margin:'0 0 3px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{req.recipient_name}</p>
          <p style={{ fontSize:11, color:'var(--text-muted)', margin:0, fontFamily:FB }}>{req.recipient_district}</p>
        </div>
      </div>
    </Link>
  );
}

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useScrollReveal();
  const axiosInstance = useAxios();

  const [request, setRequest] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/all-requests')
      .then(res => {
        const all = res.data || [];
        const found = all.find(r => r._id === id);
        if (!found) { setNotFound(true); return; }
        setRequest(found);
        setRelated(all.filter(r => r._id !== id && r.blood_group === found.blood_group).slice(0, 4));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, axiosInstance]);

  const color = bloodColors[request?.blood_group] || '#C00707';
  const ss = statusStyle[request?.donation_status] || statusStyle.pending;

  if (loading) return (
    <div style={{ minHeight:'100vh', backgroundColor:'var(--bg-base)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:48, height:48, borderRadius:'50%', border:'4px solid var(--bg-muted)', borderTopColor:'#C00707', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }} />
        <p style={{ fontFamily:FD, color:'var(--text-muted)', fontSize:14 }}>Loading request...</p>
      </div>
    </div>
  );

  if (notFound) return (
    <div style={{ minHeight:'100vh', backgroundColor:'var(--bg-base)', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:24 }}>
      <div>
        <div style={{ fontSize:64, marginBottom:16 }}>🩸</div>
        <h1 style={{ fontFamily:FD, fontWeight:800, fontSize:24, color:'var(--text-primary)', margin:'0 0 8px' }}>Request Not Found</h1>
        <p style={{ fontFamily:FB, color:'var(--text-muted)', marginBottom:24 }}>This blood request may have been removed or fulfilled.</p>
        <Link to="/all-requests" style={{ padding:'10px 24px', borderRadius:12, backgroundColor:'#C00707', color:'#fff', fontFamily:FD, fontWeight:700, fontSize:13, textDecoration:'none' }}>
          View All Requests
        </Link>
      </div>
    </div>
  );

  return (
    <div ref={pageRef} style={{ backgroundColor:'var(--bg-base)', minHeight:'100vh', fontFamily:FB }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>

      {/* Hero banner */}
      <section style={{ background:`linear-gradient(135deg, ${color}dd, ${color}99)`, padding:'52px 24px 44px' }}>
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)}
            style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:8, padding:'6px 14px', color:'#fff', fontSize:12, fontFamily:FD, fontWeight:600, cursor:'pointer', marginBottom:20 }}>
            ← Back
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
            <div style={{ width:88, height:88, borderRadius:20, background:'rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ fontFamily:FD, fontWeight:900, fontSize:40, color:'#fff', lineHeight:1 }}>{request.blood_group}</span>
            </div>
            <div>
              <div style={{ marginBottom:6 }}>
                <span style={{ padding:'4px 12px', borderRadius:99, fontSize:11, fontWeight:700, fontFamily:FD, backgroundColor:'rgba(255,255,255,0.25)', color:'#fff', textTransform:'capitalize' }}>
                  {ss.label}
                </span>
              </div>
              <h1 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(1.4rem,3vw,2rem)', color:'#fff', margin:'0 0 4px' }}>
                {request.recipient_name}
              </h1>
              <p style={{ color:'rgba(255,255,255,0.85)', margin:0, fontFamily:FB, fontSize:14 }}>
                {request.hospital_name} · {request.recipient_district}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-4xl mx-auto" style={{ padding:'36px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr min(320px,100%)', gap:28, alignItems:'start' }}>

          {/* Left — Details */}
          <div>
            <div style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:18, padding:24, marginBottom:20, boxShadow:'var(--shadow-sm)' }}>
              <h2 style={{ fontFamily:FD, fontWeight:700, fontSize:16, color:'var(--text-primary)', margin:'0 0 4px' }}>Request Overview</h2>
              <p style={{ fontFamily:FB, fontSize:13, color:'var(--text-muted)', margin:'0 0 18px', lineHeight:1.7 }}>
                An urgent blood donation is needed for <strong style={{ color:'var(--text-primary)' }}>{request.recipient_name}</strong> at <strong style={{ color:'var(--text-primary)' }}>{request.hospital_name || 'a hospital'}</strong> in {request.recipient_district}, Bangladesh. Blood group <strong style={{ color }}>{request.blood_group}</strong> is required. If you are able to donate, please contact the requester immediately.
              </p>
              <InfoRow icon="🩸" label="Blood Group Required" value={request.blood_group} />
              <InfoRow icon="👤" label="Patient Name"         value={request.recipient_name} />
              <InfoRow icon="🏥" label="Hospital"             value={request.hospital_name} />
              <InfoRow icon="📍" label="Location"             value={[request.recipient_upazila, request.recipient_district].filter(Boolean).join(', ')} />
              <InfoRow icon="📅" label="Donation Date"        value={request.donation_date} />
              <InfoRow icon="🕐" label="Donation Time"        value={request.donation_time} />
              <InfoRow icon="✍️" label="Requester"            value={request.requester_name} />
              <InfoRow icon="📧" label="Contact Email"        value={request.requester_email} />
              {request.message && (
                <div style={{ paddingTop:14 }}>
                  <p style={{ fontFamily:FD, fontWeight:700, fontSize:11, color:'var(--text-faint)', margin:'0 0 6px', textTransform:'uppercase', letterSpacing:0.5 }}>Additional Message</p>
                  <p style={{ fontFamily:FB, fontSize:13, color:'var(--text-muted)', lineHeight:1.7, margin:0, backgroundColor:'var(--bg-subtle)', padding:14, borderRadius:12 }}>{request.message}</p>
                </div>
              )}
            </div>

            <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:18, padding:24, boxShadow:'var(--shadow-sm)' }}>
              <h2 style={{ fontFamily:FD, fontWeight:700, fontSize:16, color:'var(--text-primary)', margin:'0 0 14px' }}>How to Help</h2>
              {[
                { icon:'1️⃣', text:'Check that you are eligible to donate — age 18–60, weight 50kg+, no recent illness or medication.' },
                { icon:'2️⃣', text:`Head to ${request.hospital_name || 'the listed hospital'} in ${request.recipient_district} on the specified donation date.` },
                { icon:'3️⃣', text:`Contact the requester at ${request.requester_email || 'the contact above'} to confirm your availability beforehand.` },
                { icon:'4️⃣', text:'Bring a valid national ID and stay well-hydrated before and after donating.' },
              ].map((s, i) => (
                <div key={i} style={{ display:'flex', gap:12, marginBottom:i < 3 ? 12 : 0 }}>
                  <span style={{ fontSize:16, flexShrink:0 }}>{s.icon}</span>
                  <p style={{ fontFamily:FB, fontSize:13, color:'var(--text-muted)', margin:0, lineHeight:1.6 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA sidebar */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ backgroundColor:'var(--bg-base)', border:`1px solid ${color}33`, borderRadius:18, padding:20, boxShadow:'var(--shadow-sm)', textAlign:'center' }}>
              <div style={{ width:64, height:64, borderRadius:16, background:`${color}22`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
                <span style={{ fontFamily:FD, fontWeight:900, fontSize:28, color }}>{request.blood_group}</span>
              </div>
              <p style={{ fontFamily:FD, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 6px' }}>Blood Group Needed</p>
              <span style={{ display:'inline-block', padding:'4px 14px', borderRadius:99, fontSize:12, fontWeight:700, fontFamily:FD, backgroundColor:ss.bg, color:ss.color }}>
                {ss.label}
              </span>
            </div>

            {(request.donation_status === 'pending' || request.donation_status === 'inprogress') ? (
              <a href={`mailto:${request.requester_email}`}
                style={{ display:'block', textAlign:'center', padding:'13px 20px', borderRadius:14, backgroundColor:'#C00707', color:'#fff', fontFamily:FD, fontWeight:700, fontSize:14, textDecoration:'none', transition:'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor='#A00606'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor='#C00707'}
              >
                🩸 I Want to Donate
              </a>
            ) : (
              <div style={{ textAlign:'center', padding:'13px 20px', borderRadius:14, backgroundColor:'var(--bg-muted)', color:'var(--text-faint)', fontFamily:FD, fontWeight:700, fontSize:14 }}>
                {ss.label} — No Longer Active
              </div>
            )}

            <Link to="/all-requests"
              style={{ display:'block', textAlign:'center', padding:'11px 20px', borderRadius:14, border:'1px solid var(--border)', color:'var(--text-muted)', fontFamily:FD, fontWeight:600, fontSize:13, textDecoration:'none', backgroundColor:'var(--bg-subtle)', transition:'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor='var(--bg-muted)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor='var(--bg-subtle)'}
            >
              ← All Requests
            </Link>

            <div style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:18, padding:18, boxShadow:'var(--shadow-sm)' }}>
              <p style={{ fontFamily:FD, fontWeight:700, fontSize:12, color:'var(--text-faint)', margin:'0 0 12px', textTransform:'uppercase', letterSpacing:0.5 }}>Key Information</p>
              {[
                { label:'District', value:request.recipient_district },
                { label:'Upazila',  value:request.recipient_upazila },
                { label:'Date',     value:request.donation_date },
                { label:'Time',     value:request.donation_time },
              ].filter(i => i.value).map((item, i, arr) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize:12, color:'var(--text-faint)', fontFamily:FB }}>{item.label}</span>
                  <span style={{ fontSize:12, color:'var(--text-primary)', fontFamily:FD, fontWeight:600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related requests */}
        {related.length > 0 && (
          <div style={{ marginTop:40 }}>
            <h2 style={{ fontFamily:FD, fontWeight:700, fontSize:18, color:'var(--text-primary)', margin:'0 0 16px' }}>
              Other {request.blood_group} Requests
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:14 }}>
              {related.map((r, i) => <RelatedCard key={r._id || i} req={r} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetail;