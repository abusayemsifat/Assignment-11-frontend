// src/Pages/Home/Home.jsx
import { Link } from 'react-router';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useScrollReveal from '../../hooks/useScrollReveal';
import useCountUp from '../../hooks/useCountUp';

/* ── Data ──────────────────────────────────────────── */
const bloodGroups = [
  { group:'A+',  color:'#C00707', available:12 },
  { group:'A-',  color:'#FF4400', available:5  },
  { group:'B+',  color:'#134E8E', available:18 },
  { group:'B-',  color:'#FFB33F', available:3  },
  { group:'O+',  color:'#C00707', available:24 },
  { group:'O-',  color:'#FF4400', available:7  },
  { group:'AB+', color:'#134E8E', available:9  },
  { group:'AB-', color:'#FFB33F', available:2  },
];
const steps = [
  { step:'01', icon:'📝', title:'Register',     desc:'Create your free account and fill in your blood group and location.' },
  { step:'02', icon:'🔍', title:'Find or Post', desc:'Search for nearby donors or post an urgent blood request.' },
  { step:'03', icon:'🩸', title:'Save a Life',  desc:'Connect directly with the donor and coordinate the donation.' },
];
const testimonials = [
  { name:'Fatima Khanam',  location:'Dhaka',      text:'Blood+ connected me with a donor within 2 hours. My son is alive because of this platform.', avatar:'👩' },
  { name:'Rahim Uddin',    location:'Chittagong', text:'I donate every 3 months. Blood+ makes it easy to find people who truly need help.', avatar:'👨' },
  { name:'Nusrat Jahan',   location:'Sylhet',     text:'After my accident, the hospital needed O− urgently. Got a donor in under an hour!', avatar:'👩' },
];
const faqs = [
  { q:'Who can donate blood?',           a:'Anyone aged 18–65 in good health, weighing at least 50 kg, can donate blood every 3 months.' },
  { q:'Is blood donation safe?',         a:'Yes. All equipment is sterile and single-use. You cannot contract any disease by donating.' },
  { q:'How long does donation take?',    a:'The actual donation takes 8–10 minutes. With registration and rest, expect about 45–60 minutes.' },
  { q:'Can I donate after vaccination?', a:'Yes, you can donate 48 hours after most vaccines. COVID-19 vaccine requires a 14-day wait.' },
];

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

/* ── Animations CSS ─────────────────────────────────── */
const CSS = `
  @keyframes float-drop {
    0%,100% { transform: translateY(-50%) rotate(-2deg); }
    50%      { transform: translateY(-53%) translateX(10px) rotate(2.5deg); }
  }
  @keyframes orb-a {
    0%,100% { transform: scale(1)    translateY(0px); }
    50%      { transform: scale(1.05) translateY(-16px); }
  }
  @keyframes orb-b {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(14px); }
  }
  @keyframes badge-in {
    from { opacity:0; transform:translateY(-14px) scale(0.9); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(26px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes hero-pop {
    0%  { opacity:0; transform:scale(0.75) translateY(10px); }
    70% { transform:scale(1.06) translateY(-2px); }
    100%{ opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes pulse-live {
    0%,100% { box-shadow: 0 0 0 0   rgba(255,179,63,0.7); }
    50%      { box-shadow: 0 0 0 7px rgba(255,179,63,0); }
  }
  @keyframes urgency-blink {
    0%,100% { box-shadow: 0 0 0 0   currentColor; opacity:1; }
    50%      { box-shadow: 0 0 0 6px transparent;  opacity:0.7; }
  }
  @keyframes shimmer-bar {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }
  @keyframes blood-drip {
    0%   { transform: scaleY(0) translateY(0); opacity:1; }
    80%  { transform: scaleY(1) translateY(0); opacity:1; }
    100% { transform: scaleY(1) translateY(4px); opacity:0; }
  }
  @keyframes testi-quote {
    from { opacity:0; transform: scale(0.5) rotate(-10deg); }
    to   { opacity:0.07; transform: scale(1) rotate(0deg); }
  }

  /* Hero entrance */
  .h-badge { animation: badge-in 0.5s cubic-bezier(.34,1.56,.64,1) 0.15s both; }
  .h-h1    { animation: fade-up  0.6s ease 0.3s  both; }
  .h-para  { animation: fade-up  0.6s ease 0.48s both; }
  .h-btns  { animation: fade-up  0.6s ease 0.62s both; }
  .h-nums  { animation: fade-up  0.6s ease 0.76s both; }

  /* Floating orbs */
  .orb-a { animation: orb-a 7s ease-in-out infinite; }
  .orb-b { animation: orb-b 5.5s ease-in-out infinite 1.2s; }
  .orb-c { animation: orb-a 6.5s ease-in-out infinite 0.6s; }

  /* Watermark drop */
  .wm-drop { animation: float-drop 9s ease-in-out infinite; }

  /* Stat card pop on reveal */
  .stat-card[data-revealed] { animation: hero-pop 0.55s cubic-bezier(.34,1.56,.64,1) both; }

  /* Live dot */
  .live-dot { animation: pulse-live 1.8s ease infinite; }

  /* Urgency dot */
  .urg-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; animation: urgency-blink 1.6s ease infinite; }

  /* Blood group card */
  .bg-card {
    transition: transform 0.25s cubic-bezier(.34,1.56,.64,1),
                box-shadow 0.25s ease, border-color 0.25s ease !important;
  }
  .bg-card:hover { transform: translateY(-8px) scale(1.05) !important; }

  /* Step card */
  .step-card { transition: transform 0.25s ease, box-shadow 0.28s ease !important; }
  .step-card:hover { transform: translateY(-8px) !important; box-shadow: 0 24px 48px rgba(0,0,0,0.2) !important; }

  /* Step icon bounce on card hover */
  .step-card:hover .step-icon { animation: hero-pop 0.4s cubic-bezier(.34,1.56,.64,1) both; }

  /* Req card */
  .req-card { transition: transform 0.22s ease, box-shadow 0.22s ease !important; }
  .req-card:hover { transform: translateY(-6px) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.15) !important; }

  /* Testimonial */
  .testi-card { transition: transform 0.25s ease, border-color 0.25s ease !important; }
  .testi-card:hover { transform: translateY(-6px) !important; border-color: rgba(192,7,7,0.4) !important; }
  .testi-card:hover .testi-bg-quote { animation: testi-quote 0.45s ease both; }

  /* FAQ row */
  .faq-row { transition: border-color 0.2s, transform 0.2s, background 0.2s !important; }
  .faq-row:hover { transform: translateX(6px) !important; border-left-color: #FF4400 !important; background: var(--bg-subtle) !important; }

  /* Shimmer bar inside stat numbers */
  .count-shimmer {
    position: relative; overflow: hidden;
    display: inline-block;
  }
  .count-shimmer::after {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 30%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    animation: shimmer-bar 2s ease 1.5s 1;
  }

  /* CTA button spring */
  .cta-btn {
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), background-color 0.18s ease, box-shadow 0.18s ease !important;
  }
  .cta-btn:hover { transform: scale(1.07) !important; }
  .cta-btn:active { transform: scale(0.96) !important; }
`;

/* ── Animated stat counter ─────────────────────────── */
const StatCounter = ({ target, suffix, label, icon, color, delay }) => {
  const [ref, display] = useCountUp(target, 1800, suffix);
  return (
    <div ref={ref} className="stat-card" data-reveal data-reveal-dir="scale"
      style={{ textAlign:'center', animationDelay: delay }}>
      <div style={{ fontSize:30, marginBottom:4 }}>{icon}</div>
      <p className="count-shimmer" style={{ fontFamily:FD, fontWeight:800, fontSize:32, color, margin:'4px 0 2px', display:'block' }}>
        {display}
      </p>
      <p style={{ fontSize:12, color:'#888', margin:0, fontFamily:FB }}>{label}</p>
    </div>
  );
};

/* ── Hero mini-stat ─────────────────────────────────── */
const HeroStat = ({ target, suffix, label }) => {
  const [ref, display] = useCountUp(target, 1600, suffix);
  return (
    <div ref={ref}>
      <p style={{ fontFamily:FD, fontWeight:800, fontSize:26, color:'#fff', margin:0 }}>{display}</p>
      <p style={{ fontSize:12, color:'rgba(255,255,255,0.65)', margin:0, fontFamily:FB }}>{label}</p>
    </div>
  );
};

/* ── Main component ─────────────────────────────────── */
const Home = () => {
  const { user } = useContext(AuthContext);
  const heroRef = useRef(null);

  // Section scroll-reveal refs
  const statsRef  = useScrollReveal();
  const howRef    = useScrollReveal();
  const bgRef     = useScrollReveal();
  const urgRef    = useScrollReveal();
  const testiRef  = useScrollReveal();
  const faqRef    = useScrollReveal();
  const ctaRef    = useScrollReveal();

  // GSAP: watermark drop entrance + parallax on scroll
  useEffect(() => {
    (async () => {
      try {
        const mod  = await import('gsap');
        const gsap = mod.gsap || mod.default;

        // Entrance
        gsap.fromTo('.wm-drop',
          { opacity:0, scale:0.6, x:60 },
          { opacity:0.07, scale:1, x:0, duration:1.3, ease:'power3.out', delay:0.5 }
        );

        // Subtle parallax — drop drifts up as you scroll
        const onScroll = () => {
          const el = document.querySelector('.wm-drop');
          if (el) {
            const y = window.scrollY * 0.12;
            el.style.marginTop = `-${y}px`;
          }
        };
        window.addEventListener('scroll', onScroll, { passive:true });
        return () => window.removeEventListener('scroll', onScroll);
      } catch {}
    })();
  }, []);

  // GSAP stagger: reveal step cards and blood group cards on scroll
  useEffect(() => {
    (async () => {
      try {
        const mod  = await import('gsap');
        const gsap = mod.gsap || mod.default;
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo('.step-card',
          { opacity:0, y:40, scale:0.95 },
          { opacity:1, y:0,  scale:1, duration:0.55, stagger:0.14, ease:'power3.out',
            scrollTrigger:{ trigger:'.steps-grid', start:'top 80%', once:true } }
        );
        gsap.fromTo('.bg-card',
          { opacity:0, y:30, scale:0.9 },
          { opacity:1, y:0,  scale:1, duration:0.45, stagger:0.07, ease:'back.out(1.6)',
            scrollTrigger:{ trigger:'.bg-grid', start:'top 82%', once:true } }
        );
        gsap.fromTo('.req-card',
          { opacity:0, x:-30 },
          { opacity:1, x:0, duration:0.5, stagger:0.12, ease:'power2.out',
            scrollTrigger:{ trigger:'.req-grid', start:'top 82%', once:true } }
        );
        gsap.fromTo('.testi-card',
          { opacity:0, y:36, rotateX:8 },
          { opacity:1, y:0,  rotateX:0, duration:0.55, stagger:0.13, ease:'power3.out',
            scrollTrigger:{ trigger:'.testi-grid', start:'top 82%', once:true } }
        );
      } catch {
        // ScrollTrigger not available — useScrollReveal handles it
      }
    })();
  }, []);

  return (
    <div style={{ backgroundColor:'var(--bg-base)', color:'var(--text-primary)', fontFamily:FB }}>
      <style>{CSS}</style>

      {/* ── 1. HERO ──────────────────────────────────── */}
      <section ref={heroRef} style={{
        background:'linear-gradient(135deg,#7B0000 0%,#C00707 45%,#FF4400 80%,#FFB33F 100%)',
        minHeight:'88vh', display:'flex', alignItems:'center',
        position:'relative', overflow:'hidden',
      }}>
        {/* Floating orbs */}
        <div className="orb-a" style={{ position:'absolute', borderRadius:'50%', backgroundColor:'#fff', width:520, height:520, top:-130, right:-130, opacity:0.07, pointerEvents:'none' }} />
        <div className="orb-b" style={{ position:'absolute', borderRadius:'50%', backgroundColor:'#fff', width:280, height:280, bottom:-80, left:-80, opacity:0.09, pointerEvents:'none' }} />
        <div className="orb-c" style={{ position:'absolute', borderRadius:'50%', backgroundColor:'#fff', width:180, height:180, top:'35%', right:'12%', opacity:0.05, pointerEvents:'none' }} />

        {/* Watermark drop */}
        <svg className="wm-drop" style={{ position:'absolute', right:'4%', top:'50%', opacity:0, width:360, height:420, pointerEvents:'none' }} viewBox="0 0 100 120" fill="white">
          <path d="M50 5 C50 5 8 58 8 78 A42 42 0 0 0 92 78 C92 58 50 5 50 5Z" />
        </svg>

        <div className="max-w-7xl mx-auto w-full" style={{ padding:'0 24px', position:'relative', zIndex:1 }}>

          {/* Badge */}
          <div className="h-badge" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(255,255,255,0.16)', color:'#fff',
            fontSize:11, fontWeight:700, padding:'7px 16px', borderRadius:99,
            letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:22,
            fontFamily:FD, backdropFilter:'blur(8px)',
            border:'1px solid rgba(255,255,255,0.25)',
          }}>
            <span className="live-dot" style={{ width:7, height:7, borderRadius:'50%', backgroundColor:'#FFB33F', display:'inline-block', flexShrink:0 }} />
            Save Lives Today
          </div>

          <h1 className="h-h1" style={{ fontFamily:FD, fontWeight:800, color:'#fff', margin:'0 0 18px', fontSize:'clamp(2rem,5.5vw,3.75rem)', lineHeight:1.15 }}>
            Every Drop Counts.<br />
            <span style={{ color:'#FFE0A0' }}>Be a Hero.</span>
          </h1>

          <p className="h-para" style={{ color:'rgba(255,255,255,0.85)', fontSize:17, lineHeight:1.72, margin:'0 0 32px', maxWidth:540, fontFamily:FB }}>
            Bangladesh's largest blood donation network. Connect with donors, post urgent requests, and save lives — all in one place.
          </p>

          <div className="h-btns" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:44 }}>
            <Link to={user ? '/dashboard' : '/signup'} className="cta-btn" style={{
              padding:'13px 30px', borderRadius:12, background:'#fff', color:'#C00707',
              fontWeight:700, fontSize:14, textDecoration:'none', fontFamily:FD,
              boxShadow:'0 4px 20px rgba(0,0,0,0.18)',
            }}>
              {user ? 'Go to Dashboard' : 'Join as a Donor'}
            </Link>
            <Link to="/search" className="cta-btn" style={{
              padding:'13px 30px', borderRadius:12,
              background:'rgba(255,255,255,0.14)', border:'2px solid rgba(255,255,255,0.38)',
              color:'#fff', fontWeight:700, fontSize:14, textDecoration:'none', fontFamily:FD,
            }}>
              Search Donors →
            </Link>
          </div>

          {/* Hero counter stats */}
          <div className="h-nums" style={{ display:'flex', gap:36, flexWrap:'wrap' }}>
            <HeroStat target={10000} suffix="+"  label="Donors" />
            <HeroStat target={3500}  suffix="+"  label="Lives Saved" />
            <HeroStat target={64}    suffix=""   label="Districts" />
          </div>

        </div>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────── */}
      <section ref={statsRef} style={{ backgroundColor:'#111', padding:'40px 24px' }}>
        <div className="max-w-7xl mx-auto" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:28 }}>
          <StatCounter target={10000} suffix="+"  label="Registered Donors"   icon="👥" color="#C00707" delay="0ms"   />
          <StatCounter target={3500}  suffix="+"  label="Lives Saved"          icon="❤️" color="#FF4400" delay="80ms"  />
          <StatCounter target={64}    suffix=""   label="Districts Covered"    icon="📍" color="#134E8E" delay="160ms" />
          <StatCounter target={500}   suffix="+"  label="Donations This Month" icon="🩸" color="#FFB33F" delay="240ms" />
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ──────────────────────────── */}
      <section ref={howRef} style={{ backgroundColor:'var(--bg-subtle)', padding:'80px 24px' }}>
        <div className="max-w-7xl mx-auto">
          <div data-reveal style={{ textAlign:'center', marginBottom:52 }}>
            <h2 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--text-primary)', margin:'0 0 8px' }}>How It Works</h2>
            <p style={{ color:'var(--text-muted)', fontFamily:FB }}>Three simple steps to save a life</p>
          </div>
          <div className="steps-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:24 }}>
            {steps.map((s,i) => (
              <div key={s.step} className="step-card" style={{
                textAlign:'center', padding:'44px 24px 36px', borderRadius:20, position:'relative',
                backgroundColor:'var(--bg-base)', border:'1px solid var(--border)',
              }}>
                <span style={{
                  position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)',
                  width:32, height:32, borderRadius:'50%', backgroundColor:'#C00707', color:'#fff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:800, fontFamily:FD,
                  boxShadow:'0 0 0 4px var(--bg-subtle), 0 4px 12px rgba(192,7,7,0.4)',
                }}>{s.step}</span>
                <div className="step-icon" style={{ fontSize:46, margin:'6px 0 16px', display:'inline-block', filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>{s.icon}</div>
                <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:17, color:'var(--text-primary)', margin:'0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize:13, lineHeight:1.68, color:'var(--text-muted)', margin:0, fontFamily:FB }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BLOOD GROUPS ──────────────────────────── */}
      <section ref={bgRef} style={{ backgroundColor:'var(--bg-base)', padding:'80px 24px' }}>
        <div className="max-w-7xl mx-auto">
          <div data-reveal style={{ textAlign:'center', marginBottom:52 }}>
            <h2 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--text-primary)', margin:'0 0 8px' }}>Blood Group Availability</h2>
            <p style={{ color:'var(--text-muted)', fontFamily:FB }}>Live donor counts across Bangladesh</p>
          </div>
          <div className="bg-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:14 }}>
            {bloodGroups.map((bg) => (
              <Link key={bg.group} to={`/search?blood=${bg.group}`}
                className="bg-card"
                style={{
                  textDecoration:'none', padding:'28px 12px', borderRadius:16, textAlign:'center',
                  backgroundColor:'var(--bg-subtle)', border:`2px solid var(--border)`, display:'block',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=bg.color; e.currentTarget.style.boxShadow=`0 10px 32px ${bg.color}40`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='none'; }}
              >
                <p style={{ fontFamily:FD, fontWeight:900, fontSize:36, color:bg.color, margin:'0 0 4px', lineHeight:1 }}>{bg.group}</p>
                <p style={{ fontFamily:FB, fontSize:11, color:'var(--text-faint)', margin:0 }}>{bg.available} donors</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. URGENT REQUESTS ───────────────────────── */}
      <section ref={urgRef} style={{ backgroundColor:'var(--bg-subtle)', padding:'80px 24px' }}>
        <div className="max-w-7xl mx-auto">
          <div data-reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:36, flexWrap:'wrap', gap:12 }}>
            <div>
              <h2 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--text-primary)', margin:'0 0 4px' }}>Urgent Requests</h2>
              <p style={{ color:'var(--text-muted)', margin:0, fontFamily:FB }}>People who need blood right now</p>
            </div>
            <Link to="/all-requests" className="cta-btn" style={{
              padding:'9px 20px', borderRadius:10, border:'1.5px solid #C00707',
              color:'#C00707', fontSize:13, fontWeight:700, fontFamily:FD, textDecoration:'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor='#C00707'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='#C00707'; }}
            >View All →</Link>
          </div>
          <div className="req-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:18 }}>
            {[
              { name:'Karim Hossain', blood:'O−',  location:'Dhaka Medical',  urgency:'Critical', time:'2 hours ago' },
              { name:'Sumaiya Akter', blood:'AB+', location:'Chittagong CMH', urgency:'Urgent',   time:'5 hours ago' },
              { name:'Rashed Ahmed',  blood:'B+',  location:'Sylhet MAG',     urgency:'Normal',   time:'1 day ago'   },
            ].map((req,i) => {
              const u = {
                Critical:{ bg:'rgba(192,7,7,0.1)',   color:'#C00707', dot:'#C00707' },
                Urgent:  { bg:'rgba(255,68,0,0.1)',  color:'#FF4400', dot:'#FF4400' },
                Normal:  { bg:'rgba(19,78,142,0.1)', color:'#134E8E', dot:'#134E8E' },
              }[req.urgency];
              return (
                <div key={i} className="req-card" style={{
                  backgroundColor:'var(--bg-base)', border:'1px solid var(--border)',
                  borderRadius:16, padding:20, display:'flex', flexDirection:'column', gap:14,
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <p style={{ fontFamily:FD, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 3px' }}>{req.name}</p>
                      <p style={{ fontSize:12, color:'var(--text-muted)', margin:0, fontFamily:FB }}>📍 {req.location}</p>
                    </div>
                    <span style={{ fontFamily:FD, fontWeight:900, fontSize:24, color:'#C00707', background:'rgba(192,7,7,0.09)', padding:'4px 10px', borderRadius:8 }}>{req.blood}</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:6, ...u, padding:'4px 11px', borderRadius:99, fontSize:11, fontWeight:700, fontFamily:FD }}>
                      <span className="urg-dot" style={{ backgroundColor:u.dot, color:u.dot }} />
                      {req.urgency}
                    </span>
                    <span style={{ fontSize:11, color:'var(--text-faint)', fontFamily:FB }}>{req.time}</span>
                  </div>
                  <Link to="/all-requests" className="cta-btn" style={{
                    display:'block', textAlign:'center', padding:'10px 0', borderRadius:10,
                    backgroundColor:'#C00707', color:'#fff', fontWeight:700, fontSize:12,
                    textDecoration:'none', fontFamily:FD,
                  }}>Respond</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ──────────────────────────── */}
      <section ref={testiRef} style={{ backgroundColor:'var(--bg-base)', padding:'80px 24px' }}>
        <div className="max-w-7xl mx-auto">
          <div data-reveal style={{ textAlign:'center', marginBottom:52 }}>
            <h2 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--text-primary)', margin:'0 0 8px' }}>Real Stories</h2>
            <p style={{ color:'var(--text-muted)', fontFamily:FB }}>Lives changed by our community</p>
          </div>
          <div className="testi-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:18 }}>
            {testimonials.map((t,i) => (
              <div key={i} className="testi-card" style={{
                backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)',
                borderRadius:18, padding:26, position:'relative', overflow:'hidden',
                perspective:600,
              }}>
                <div className="testi-bg-quote" style={{
                  position:'absolute', top:-14, left:10, fontSize:90,
                  color:'#C00707', opacity:0.07, fontFamily:FD, fontWeight:900, lineHeight:1,
                  pointerEvents:'none', userSelect:'none',
                }}>"</div>
                <p style={{ fontSize:40, color:'#C00707', margin:'0 0 8px', lineHeight:1, fontFamily:FD, position:'relative' }}>"</p>
                <p style={{ fontSize:13, lineHeight:1.78, color:'var(--text-muted)', margin:'0 0 18px', fontFamily:FB, position:'relative' }}>{t.text}</p>
                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <span style={{ fontSize:30, lineHeight:1, filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.15))' }}>{t.avatar}</span>
                  <div>
                    <p style={{ fontFamily:FD, fontWeight:700, fontSize:13, color:'var(--text-primary)', margin:0 }}>{t.name}</p>
                    <p style={{ fontSize:11, color:'var(--text-faint)', margin:0, fontFamily:FB }}>📍 {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────── */}
      <section ref={faqRef} style={{ backgroundColor:'var(--bg-subtle)', padding:'80px 24px' }}>
        <div style={{ maxWidth:700, margin:'0 auto' }}>
          <div data-reveal style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--text-primary)', margin:'0 0 8px' }}>FAQ</h2>
            <p style={{ color:'var(--text-muted)', fontFamily:FB }}>Everything you need to know about donating blood</p>
          </div>
          {faqs.map((faq,i) => (
            <div key={i} className="faq-row" data-reveal data-reveal-delay={i*80}
              style={{
                backgroundColor:'var(--bg-base)', border:'1px solid var(--border)',
                borderLeft:'3px solid #C00707', borderRadius:14,
                padding:'18px 22px', marginBottom:10,
              }}>
              <p style={{ fontFamily:FD, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 7px' }}>{faq.q}</p>
              <p style={{ fontSize:13, lineHeight:1.68, color:'var(--text-muted)', margin:0, fontFamily:FB }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. CTA ───────────────────────────────────── */}
      <section ref={ctaRef} style={{ background:'linear-gradient(135deg,#C00707 0%,#FF4400 100%)', padding:'80px 24px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <svg style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', opacity:0.05, width:320, pointerEvents:'none' }} viewBox="0 0 100 120" fill="white">
          <path d="M50 5 C50 5 8 58 8 78 A42 42 0 0 0 92 78 C92 58 50 5 50 5Z" />
        </svg>
        <h2 data-reveal style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(1.75rem,3.5vw,2.75rem)', color:'#fff', margin:'0 0 12px', position:'relative' }}>Ready to Save Lives?</h2>
        <p data-reveal data-reveal-delay="100" style={{ color:'rgba(255,255,255,0.85)', fontSize:16, margin:'0 0 32px', fontFamily:FB, position:'relative' }}>
          Join 10,000+ donors across Bangladesh. Register free and be someone's hero today.
        </p>
        <div data-reveal data-reveal-delay="200" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', position:'relative' }}>
          <Link to="/signup" className="cta-btn" style={{
            padding:'13px 30px', borderRadius:12, backgroundColor:'#FFB33F', color:'#111',
            fontWeight:800, fontSize:14, textDecoration:'none', fontFamily:FD,
            boxShadow:'0 4px 24px rgba(0,0,0,0.22)',
          }}>🩸 Become a Donor</Link>
          <Link to="/all-requests" className="cta-btn" style={{
            padding:'13px 30px', borderRadius:12, border:'2px solid rgba(255,255,255,0.45)',
            color:'#fff', fontWeight:700, fontSize:14, textDecoration:'none', fontFamily:FD,
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor='rgba(255,255,255,0.14)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor='transparent'}
          >View Urgent Requests</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;