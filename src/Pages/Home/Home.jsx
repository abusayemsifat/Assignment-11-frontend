import { Link } from 'react-router';

const bloodGroups = [
  { group: 'A+',  color: '#C00707', available: 12 },
  { group: 'A-',  color: '#FF4400', available: 5  },
  { group: 'B+',  color: '#134E8E', available: 18 },
  { group: 'B-',  color: '#FFB33F', available: 3  },
  { group: 'O+',  color: '#C00707', available: 24 },
  { group: 'O-',  color: '#FF4400', available: 7  },
  { group: 'AB+', color: '#134E8E', available: 9  },
  { group: 'AB-', color: '#FFB33F', available: 2  },
];

const steps = [
  { step: '01', icon: '📝', title: 'Register',     desc: 'Create your free account and fill in your blood group and location.' },
  { step: '02', icon: '🔍', title: 'Find or Post', desc: 'Search for nearby donors or post an urgent blood request.' },
  { step: '03', icon: '🩸', title: 'Save a Life',  desc: 'Connect directly with the donor and coordinate the donation.' },
];

const stats = [
  { value: '10,000+', label: 'Registered Donors',   icon: '👥', color: '#C00707' },
  { value: '3,500+',  label: 'Lives Saved',          icon: '❤️', color: '#FF4400' },
  { value: '64',      label: 'Districts Covered',    icon: '📍', color: '#134E8E' },
  { value: '500+',    label: 'Donations This Month', icon: '🩸', color: '#FFB33F' },
];

const testimonials = [
  { name: 'Fatima Khanam',  location: 'Dhaka',      text: 'Blood+ connected me with a donor within 2 hours. My son is alive because of this platform.', avatar: '👩' },
  { name: 'Rahim Uddin',    location: 'Chittagong', text: 'I donate every 3 months. Blood+ makes it easy to find people who truly need help.', avatar: '👨' },
  { name: 'Nusrat Jahan',   location: 'Sylhet',     text: 'After my accident, the hospital needed O− urgently. Got a donor in under an hour!', avatar: '👩' },
];

const faqs = [
  { q: 'Who can donate blood?',           a: 'Anyone aged 18–65 in good health, weighing at least 50 kg, can donate blood every 3 months.' },
  { q: 'Is blood donation safe?',         a: 'Yes. All equipment is sterile and single-use. You cannot contract any disease by donating.' },
  { q: 'How long does donation take?',    a: 'The actual donation takes 8–10 minutes. With registration and rest, expect about 45–60 minutes.' },
  { q: 'Can I donate after vaccination?', a: 'Yes, you can donate 48 hours after most vaccines. COVID-19 vaccine requires a 14-day wait.' },
];

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";

const Home = () => (
  <div style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', fontFamily: FONT_BODY }}>

    {/* ── 1. HERO ─────────────────────────────────────────────── */}
    <section style={{
      background: 'linear-gradient(135deg, #7B0000 0%, #C00707 45%, #FF4400 80%, #FFB33F 100%)',
      minHeight: '88vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      {[
        { size: 520, top: -130, right: -130, opacity: 0.07 },
        { size: 280, bottom: -80, left: -80, opacity: 0.09 },
        { size: 180, top: '35%', right: '12%', opacity: 0.05 },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%', backgroundColor: '#fff',
          width: c.size, height: c.size, top: c.top, bottom: c.bottom,
          left: c.left, right: c.right, opacity: c.opacity, pointerEvents: 'none',
        }} />
      ))}
      {/* Blood drop SVG watermark */}
      <svg style={{ position: 'absolute', right: '4%', top: '50%', transform: 'translateY(-50%)', opacity: 0.06, width: 360, height: 420 }}
           viewBox="0 0 100 120" fill="white">
        <path d="M50 5 C50 5 8 58 8 78 A42 42 0 0 0 92 78 C92 58 50 5 50 5Z" />
      </svg>

      <div className="max-w-7xl mx-auto w-full" style={{ padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <span style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: '#fff',
          fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 99,
          letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20, fontFamily: FONT_DISPLAY,
        }}>🩸 Save Lives Today</span>

        <h1 style={{
          fontFamily: FONT_DISPLAY, fontWeight: 800, color: '#fff', margin: '0 0 18px',
          fontSize: 'clamp(2rem, 5.5vw, 3.75rem)', lineHeight: 1.15,
        }}>
          Every Drop Counts.<br />
          <span style={{ color: '#FFE0A0' }}>Be a Hero.</span>
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, lineHeight: 1.7, margin: '0 0 32px', maxWidth: 540, fontFamily: FONT_BODY }}>
          Bangladesh's largest blood donation network. Connect with donors, post urgent requests, and save lives — all in one place.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
          <Link to="/signup" style={{
            padding: '13px 30px', borderRadius: 12, background: '#fff', color: '#C00707',
            fontWeight: 700, fontSize: 14, textDecoration: 'none', fontFamily: FONT_DISPLAY, transition: 'all 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#FFE0A0'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >Join as a Donor</Link>
          <Link to="/search" style={{
            padding: '13px 30px', borderRadius: 12,
            background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)',
            color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', fontFamily: FONT_DISPLAY, transition: 'all 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >Search Donors →</Link>
        </div>

        <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
          {[['10K+', 'Donors'], ['3.5K+', 'Lives Saved'], ['64', 'Districts']].map(([v, l]) => (
            <div key={l}>
              <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 26, color: '#fff', margin: 0 }}>{v}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, fontFamily: FONT_BODY }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 2. STATS BAR ────────────────────────────────────────── */}
    <section style={{ backgroundColor: '#111', padding: '32px 24px' }}>
      <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 26 }}>{s.icon}</div>
            <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 28, color: s.color, margin: '4px 0 0' }}>{s.value}</p>
            <p style={{ fontSize: 12, color: '#A0A0A0', margin: 0, fontFamily: FONT_BODY }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── 3. HOW IT WORKS ─────────────────────────────────────── */}
    <section style={{ backgroundColor: 'var(--bg-subtle)', padding: '80px 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text-primary)', margin: '0 0 8px' }}>How It Works</h2>
          <p style={{ color: 'var(--text-muted)', fontFamily: FONT_BODY }}>Three simple steps to save a life</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
          {steps.map(s => (
            <div key={s.step} style={{
              textAlign: 'center', padding: '36px 24px', borderRadius: 20, position: 'relative',
              backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)',
            }}>
              <span style={{
                position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)',
                width: 30, height: 30, borderRadius: '50%', backgroundColor: '#C00707', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, fontFamily: FONT_DISPLAY,
              }}>{s.step}</span>
              <div style={{ fontSize: 42, margin: '8px 0 12px' }}>{s.icon}</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, color: 'var(--text-primary)', margin: '0 0 8px' }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-muted)', margin: 0, fontFamily: FONT_BODY }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 4. BLOOD GROUPS ─────────────────────────────────────── */}
    <section style={{ backgroundColor: 'var(--bg-base)', padding: '80px 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text-primary)', margin: '0 0 8px' }}>Blood Group Availability</h2>
          <p style={{ color: 'var(--text-muted)', fontFamily: FONT_BODY }}>Live donor counts across Bangladesh</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 14 }}>
          {bloodGroups.map(bg => (
            <Link key={bg.group} to={`/search?blood=${bg.group}`} style={{
              textDecoration: 'none', padding: '24px 12px', borderRadius: 14, textAlign: 'center',
              backgroundColor: 'var(--bg-subtle)', border: '2px solid var(--border)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = bg.color; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 34, color: bg.color, margin: '0 0 4px' }}>{bg.group}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 11, color: 'var(--text-faint)', margin: 0 }}>{bg.available} donors</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ── 5. URGENT REQUESTS ──────────────────────────────────── */}
    <section style={{ backgroundColor: 'var(--bg-subtle)', padding: '80px 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text-primary)', margin: '0 0 4px' }}>Urgent Requests</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontFamily: FONT_BODY }}>People who need blood right now</p>
          </div>
          <Link to="/all-requests" style={{
            padding: '9px 18px', borderRadius: 10, border: '1.5px solid #C00707',
            color: '#C00707', fontSize: 13, fontWeight: 700, fontFamily: FONT_DISPLAY, textDecoration: 'none', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C00707'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C00707'; }}
          >View All →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 18 }}>
          {[
            { name: 'Karim Hossain', blood: 'O−', location: 'Dhaka Medical',  urgency: 'Critical', time: '2 hours ago' },
            { name: 'Sumaiya Akter', blood: 'AB+', location: 'Chittagong CMH', urgency: 'Urgent',   time: '5 hours ago' },
            { name: 'Rashed Ahmed',  blood: 'B+',  location: 'Sylhet MAG',      urgency: 'Normal',   time: '1 day ago' },
          ].map((req, i) => {
            const u = { Critical:{ bg:'rgba(192,7,7,0.1)',color:'#C00707' }, Urgent:{ bg:'rgba(255,68,0,0.1)',color:'#FF4400' }, Normal:{ bg:'rgba(19,78,142,0.1)',color:'#134E8E' }}[req.urgency];
            return (
              <div key={i} style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:14, padding:18, display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <div>
                    <p style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 2px' }}>{req.name}</p>
                    <p style={{ fontSize:12, color:'var(--text-muted)', margin:0, fontFamily:FONT_BODY }}>📍 {req.location}</p>
                  </div>
                  <span style={{ fontFamily:FONT_DISPLAY, fontWeight:900, fontSize:22, color:'#C00707' }}>{req.blood}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ ...u, padding:'3px 10px', borderRadius:99, fontSize:11, fontWeight:700, fontFamily:FONT_DISPLAY }}>{req.urgency}</span>
                  <span style={{ fontSize:11, color:'var(--text-faint)', fontFamily:FONT_BODY }}>{req.time}</span>
                </div>
                <Link to="/all-requests" style={{
                  display:'block', textAlign:'center', padding:'9px 0', borderRadius:8,
                  backgroundColor:'#C00707', color:'#fff', fontWeight:700, fontSize:12,
                  textDecoration:'none', fontFamily:FONT_DISPLAY, transition:'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#A00606'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C00707'}
                >Respond</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── 6. TESTIMONIALS ─────────────────────────────────────── */}
    <section style={{ backgroundColor:'var(--bg-base)', padding:'80px 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--text-primary)', margin:'0 0 8px' }}>Real Stories</h2>
          <p style={{ color:'var(--text-muted)', fontFamily:FONT_BODY }}>Lives changed by our community</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:18 }}>
          {testimonials.map((t,i) => (
            <div key={i} style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:14, padding:22 }}>
              <p style={{ fontSize:36, color:'#C00707', margin:'0 0 4px', lineHeight:1, fontFamily:FONT_DISPLAY }}>"</p>
              <p style={{ fontSize:13, lineHeight:1.7, color:'var(--text-muted)', margin:'0 0 14px', fontFamily:FONT_BODY }}>{t.text}</p>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <span style={{ fontSize:26 }}>{t.avatar}</span>
                <div>
                  <p style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:13, color:'var(--text-primary)', margin:0 }}>{t.name}</p>
                  <p style={{ fontSize:11, color:'var(--text-faint)', margin:0, fontFamily:FONT_BODY }}>📍 {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 7. FAQ ──────────────────────────────────────────────── */}
    <section style={{ backgroundColor:'var(--bg-subtle)', padding:'80px 24px' }}>
      <div style={{ maxWidth:700, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--text-primary)', margin:'0 0 8px' }}>FAQ</h2>
          <p style={{ color:'var(--text-muted)', fontFamily:FONT_BODY }}>Everything you need to know about donating blood</p>
        </div>
        {faqs.map((faq,i) => (
          <div key={i} style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:12, padding:18, marginBottom:10 }}>
            <p style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 6px' }}>{faq.q}</p>
            <p style={{ fontSize:13, lineHeight:1.6, color:'var(--text-muted)', margin:0, fontFamily:FONT_BODY }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── 8. CTA ──────────────────────────────────────────────── */}
    <section style={{ background:'linear-gradient(135deg,#C00707 0%,#FF4400 100%)', padding:'80px 24px', textAlign:'center' }}>
      <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:'clamp(1.75rem,3.5vw,2.75rem)', color:'#fff', margin:'0 0 12px' }}>Ready to Save Lives?</h2>
      <p style={{ color:'rgba(255,255,255,0.85)', fontSize:16, margin:'0 0 32px', fontFamily:FONT_BODY }}>Join 10,000+ donors across Bangladesh. Register free and be someone's hero today.</p>
      <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
        <Link to="/signup" style={{ padding:'13px 30px', borderRadius:12, backgroundColor:'#FFB33F', color:'#111', fontWeight:800, fontSize:14, textDecoration:'none', fontFamily:FONT_DISPLAY, transition:'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0A020'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFB33F'}
        >🩸 Become a Donor</Link>
        <Link to="/all-requests" style={{ padding:'13px 30px', borderRadius:12, border:'2px solid rgba(255,255,255,0.5)', color:'#fff', fontWeight:700, fontSize:14, textDecoration:'none', fontFamily:FONT_DISPLAY, transition:'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >View Urgent Requests</Link>
      </div>
    </section>

  </div>
);

export default Home;