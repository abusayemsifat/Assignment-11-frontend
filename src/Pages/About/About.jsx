// src/Pages/About/About.jsx
import { Link } from 'react-router';
import useScrollReveal from '../../hooks/useScrollReveal';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const CSS = `
  @keyframes ab-fade-up {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes ab-hero-scale {
    from { opacity:0; transform:scale(1.04); }
    to   { opacity:1; transform:scale(1); }
  }
  .ab-hero   { animation: ab-hero-scale 0.7s ease both; }
  .ab-title  { animation: ab-fade-up 0.6s ease 0.15s both; }
  .ab-sub    { animation: ab-fade-up 0.6s ease 0.28s both; }
  .ab-btns   { animation: ab-fade-up 0.6s ease 0.4s  both; }

  /* Unified card hover — same feel across all cards */
  .val-card, .milestone-card, .team-card {
    transition: transform 0.22s ease,
                box-shadow 0.22s ease,
                border-color 0.22s ease !important;
  }
  .val-card:hover, .milestone-card:hover, .team-card:hover {
    transform: translateY(-4px) !important;
    border-color: rgba(192,7,7,0.28) !important;
    box-shadow: 0 8px 24px rgba(192,7,7,0.11), 0 2px 8px rgba(0,0,0,0.06) !important;
  }
  .stat-pill {
    transition: transform 0.22s ease !important;
  }
  .stat-pill:hover { transform: scale(1.05) !important; }
`;

const values = [
  { icon: '❤️', title: 'Compassion',   color: '#C00707', desc: 'We believe every human life is precious. Our platform is built on empathy — connecting those in crisis with those who can help.' },
  { icon: '⚡', title: 'Speed',         color: '#FF4400', desc: 'In emergencies, minutes matter. We optimize every step — from posting a request to finding a donor — to be as fast as possible.' },
  { icon: '🔒', title: 'Trust',         color: '#134E8E', desc: 'Donor and recipient data is protected. All users are verified, and every interaction is safe, private, and transparent.' },
  { icon: '🌍', title: 'Accessibility', color: '#FFB33F', desc: 'Available across all 64 districts of Bangladesh, on any device. No one should be denied help because of where they are.' },
];

const team = [
  { name: 'Dr. Aminul Islam',   role: 'Founder & CEO',        avatar: '👨‍⚕️', bio: 'Cardiologist turned tech founder. Lost a patient to blood shortage in 2018 — that was the day BloodLink was born.' },
  { name: 'Nadia Rahman',       role: 'Head of Operations',   avatar: '👩‍💼', bio: '10 years in NGO management. Coordinates donor drives across 30+ hospitals nationwide.' },
  { name: 'Tanvir Ahmed',       role: 'Lead Engineer',        avatar: '👨‍💻', bio: 'Full-stack developer. Architected the real-time matching system that powers BloodLink requests.' },
  { name: 'Sabrina Khanam',     role: 'Community Manager',    avatar: '👩‍🤝‍👩', bio: 'Built the donor community from 0 to 10,000+. Manages volunteer programs across Bangladesh.' },
];

const milestones = [
  { year: '2018', event: 'Founded after a critical blood shortage incident at Dhaka Medical College Hospital.' },
  { year: '2019', event: 'Launched beta with 500 donors. First life saved within 48 hours of going live.' },
  { year: '2020', event: 'Expanded to all 8 divisions. Processed 1,000+ requests during COVID-19 crisis.' },
  { year: '2022', event: 'Reached 5,000 registered donors. Partnered with 20 hospitals nationwide.' },
  { year: '2024', event: '10,000+ donors. 3,500+ lives saved. 64 districts covered.' },
];

const About = () => {
  const valRef     = useScrollReveal();
  const teamRef    = useScrollReveal();
  const mileRef    = useScrollReveal();
  const statsRef   = useScrollReveal();
  const ctaRef     = useScrollReveal();
  const missionRef = useScrollReveal();

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', fontFamily: FB }}>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="ab-hero" style={{
        background: 'linear-gradient(135deg,#7B0000 0%,#C00707 50%,#FF4400 100%)',
        padding: 'clamp(60px,10vw,100px) 24px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,255,255,0.07),transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-15%', left:'-5%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,255,255,0.05),transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:700, margin:'0 auto' }}>
          <div className="ab-title" style={{ fontFamily: FD, fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>
            About <span style={{ color: '#FFE0A0' }}>BloodLink</span>
          </div>
          <p className="ab-sub" style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: '0 0 32px', fontFamily: FB }}>
            We are Bangladesh's largest blood donation network — connecting donors with those in critical need, 24/7, across every district in the country.
          </p>
          <div className="ab-btns" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" style={{ padding: '12px 28px', borderRadius: 12, backgroundColor: '#fff', color: '#C00707', fontWeight: 700, fontSize: 14, textDecoration: 'none', fontFamily: FD, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', transition: 'transform 0.2s', display:'inline-block' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >Join as a Donor</Link>
            <Link to="/contact" style={{ padding: '12px 28px', borderRadius: 12, border: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', fontFamily: FD, transition: 'background 0.2s', display:'inline-block' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.12)'}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
            >Contact Us</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ backgroundColor: '#111', padding: '44px 24px' }}>
        <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16 }}>
          {[
            { value: '10,000+', label: 'Registered Donors',   color: '#C00707', icon: '👥' },
            { value: '3,500+',  label: 'Lives Saved',          color: '#FF4400', icon: '❤️' },
            { value: '64',      label: 'Districts Covered',    color: '#FFB33F', icon: '📍' },
            { value: '20+',     label: 'Partner Hospitals',    color: '#134E8E', icon: '🏥' },
          ].map((s, i) => (
            <div key={i} className="stat-pill" data-reveal data-reveal-dir="scale" data-reveal-delay={`${i*80}`}
              style={{ textAlign: 'center', padding: '22px 12px', borderRadius: 16, backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <p style={{ fontFamily: FD, fontWeight: 800, fontSize: 28, color: s.color, margin: '0 0 4px' }}>{s.value}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, fontFamily: FB }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section ref={missionRef} style={{ padding: '80px 24px', backgroundColor: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 48, alignItems: 'center' }}>
          <div data-reveal>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C00707', fontFamily: FD }}>Our Mission</span>
            <h2 style={{ fontFamily: FD, fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text-primary)', margin: '10px 0 18px', lineHeight: 1.2 }}>
              No One Should Die<br />Waiting for Blood
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.78, color: 'var(--text-muted)', margin: '0 0 16px', fontFamily: FB }}>
              Every year, thousands of people in Bangladesh die because they can't find compatible blood donors in time. Hospitals run dry. Families make desperate phone calls. People die waiting.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.78, color: 'var(--text-muted)', margin: 0, fontFamily: FB }}>
              BloodLink was built to end that. We are a free, technology-powered bridge between willing donors and people in critical need — available 24/7, across every corner of the country.
            </p>
          </div>
          <div data-reveal data-reveal-dir="right" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '🩸', title: 'Real-Time Matching',    desc: 'Our system finds compatible donors in your area the moment a request is posted.' },
              { icon: '📱', title: 'Mobile First',          desc: 'Works perfectly on any phone — no app download needed, just open the website.' },
              { icon: '🆓', title: 'Always Free',           desc: 'BloodLink is completely free for donors and recipients. No hidden charges, ever.' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '18px 20px', borderRadius: 14, backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <p style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', margin: '0 0 4px' }}>{f.title}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, fontFamily: FB, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valRef} style={{ backgroundColor: 'var(--bg-subtle)', padding: '80px 24px' }}>
        <div className="max-w-7xl mx-auto">
          <div data-reveal style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: FD, fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text-primary)', margin: '0 0 10px' }}>Our Values</h2>
            <p style={{ color: 'var(--text-muted)', fontFamily: FB }}>The principles that guide everything we do</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <div key={i} className="val-card" data-reveal data-reveal-delay={`${i * 80}`}
                style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 18, padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, backgroundColor: `${v.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px', border: `1px solid ${v.color}30` }}>{v.icon}</div>
                <h3 style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: v.color, margin: '0 0 10px' }}>{v.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.72, color: 'var(--text-muted)', margin: 0, fontFamily: FB }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section ref={mileRef} style={{ backgroundColor: 'var(--bg-base)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: FD, fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text-primary)', margin: '0 0 10px' }}>Our Journey</h2>
            <p style={{ color: 'var(--text-muted)', fontFamily: FB }}>From a single incident to a nationwide movement</p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, backgroundColor: 'var(--border)' }} />
            {milestones.map((m, i) => (
              <div key={i} data-reveal data-reveal-delay={`${i * 80}`}
                style={{ display: 'flex', gap: 24, marginBottom: 28, paddingLeft: 52, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 11, top: 14, width: 20, height: 20, borderRadius: '50%', backgroundColor: '#C00707', border: '3px solid var(--bg-base)', boxShadow: '0 0 0 3px rgba(192,7,7,0.2)', zIndex: 1, flexShrink: 0 }} />
                <div className="milestone-card" style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 20px', flex: 1 }}>
                  <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 13, color: '#C00707', display: 'block', marginBottom: 6 }}>{m.year}</span>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)', margin: 0, fontFamily: FB }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section ref={teamRef} style={{ backgroundColor: 'var(--bg-subtle)', padding: '80px 24px' }}>
        <div className="max-w-7xl mx-auto">
          <div data-reveal style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: FD, fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--text-primary)', margin: '0 0 10px' }}>Meet the Team</h2>
            <p style={{ color: 'var(--text-muted)', fontFamily: FB }}>The people behind BloodLink</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
            {team.map((t, i) => (
              <div key={i} className="team-card" data-reveal data-reveal-delay={`${i * 80}`}
                style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 18, padding: '28px 22px', textAlign: 'center' }}>
                <div style={{ fontSize: 52, marginBottom: 14, lineHeight: 1 }}>{t.avatar}</div>
                <p style={{ fontFamily: FD, fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', margin: '0 0 4px' }}>{t.name}</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#C00707', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: FD, margin: '0 0 12px' }}>{t.role}</p>
                <p style={{ fontSize: 12, lineHeight: 1.72, color: 'var(--text-muted)', margin: 0, fontFamily: FB }}>{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} style={{ background: 'linear-gradient(135deg,#C00707,#FF4400)', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', opacity:0.05, width:280, pointerEvents:'none' }} viewBox="0 0 100 120" fill="white">
          <path d="M50 5 C50 5 8 58 8 78 A42 42 0 0 0 92 78 C92 58 50 5 50 5Z" />
        </svg>
        <h2 data-reveal style={{ fontFamily: FD, fontWeight: 800, fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', color: '#fff', margin: '0 0 12px', position: 'relative' }}>Be Part of the Mission</h2>
        <p data-reveal data-reveal-delay="100" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, margin: '0 0 32px', fontFamily: FB, position: 'relative' }}>
          Register as a donor today. It costs nothing. It could save everything.
        </p>
        <div data-reveal data-reveal-delay="200" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          <Link to="/signup" style={{ padding: '13px 30px', borderRadius: 12, backgroundColor: '#FFB33F', color: '#111', fontWeight: 800, fontSize: 14, textDecoration: 'none', fontFamily: FD, boxShadow: '0 4px 24px rgba(0,0,0,0.22)', transition: 'transform 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          >🩸 Register as Donor</Link>
          <Link to="/contact" style={{ padding: '13px 30px', borderRadius: 12, border: '2px solid rgba(255,255,255,0.45)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', fontFamily: FD, transition: 'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.14)'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >Get in Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default About;