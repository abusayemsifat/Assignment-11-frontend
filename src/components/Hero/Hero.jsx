// src/components/Hero/Hero.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

function useCounter(target, duration = 2000, startOn = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startOn) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startOn]);
  return count;
}

function HeroStat({ target, suffix, label, started }) {
  const count = useCounter(target, 1600, started);
  return (
    <div>
      <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 26, color: '#fff', margin: 0 }}>{count}{suffix}</p>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</p>
    </div>
  );
}

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      background: 'linear-gradient(135deg, #7B0000 0%, #C00707 45%, #FF4400 80%, #FFB33F 100%)',
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    }}>
      {/* Floating orbs */}
      <div style={{
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: '#fff',
        width: 520,
        height: 520,
        top: -130,
        right: -130,
        opacity: 0.07,
        pointerEvents: 'none',
        animation: 'orb-a 7s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: '#fff',
        width: 280,
        height: 280,
        bottom: -80,
        left: -80,
        opacity: 0.09,
        pointerEvents: 'none',
        animation: 'orb-b 5.5s ease-in-out infinite 1.2s',
      }} />
      <div style={{
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: '#fff',
        width: 180,
        height: 180,
        top: '35%',
        right: '12%',
        opacity: 0.05,
        pointerEvents: 'none',
        animation: 'orb-a 6.5s ease-in-out infinite 0.6s',
      }} />

      {/* Watermark drop */}
      <svg style={{
        position: 'absolute',
        right: '4%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 360,
        height: 420,
        pointerEvents: 'none',
        opacity: 0.07,
        animation: 'float-drop 9s ease-in-out infinite',
      }} viewBox="0 0 100 120" fill="white">
        <path d="M50 5 C50 5 8 58 8 78 A42 42 0 0 0 92 78 C92 58 50 5 50 5Z" />
      </svg>

      {/* Main content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '600px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.16)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            padding: '7px 16px',
            borderRadius: 99,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 22,
            fontFamily: "'Sora', sans-serif",
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.25)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            transitionDelay: '0.1s',
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#FFB33F',
              display: 'inline-block',
              flexShrink: 0,
              animation: 'pulse-live 1.8s ease infinite',
            }} />
            Save Lives Today
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 18px',
            fontSize: 'clamp(2rem,5.5vw,3.75rem)',
            lineHeight: 1.15,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.2s',
          }}>
            Every Drop Counts.<br />
            <span style={{ color: '#FFE0A0' }}>Be a Hero.</span>
          </h1>

          {/* Subheading */}
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 17,
            lineHeight: 1.72,
            margin: '0 0 32px',
            maxWidth: 540,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.35s',
          }}>
            Bangladesh's largest blood donation network. Connect with donors, post urgent requests, and save lives — all in one place.
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            marginBottom: 44,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.5s',
          }}>
            <Link to="/signup" style={{
              padding: '13px 30px',
              borderRadius: 12,
              background: '#fff',
              color: '#C00707',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              fontFamily: "'Sora', sans-serif",
              boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
              transition: 'transform 0.22s ease, background-color 0.18s ease, box-shadow 0.18s ease',
              display: 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
              Join as a Donor
            </Link>
            <Link to="/search" style={{
              padding: '13px 30px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.14)',
              border: '2px solid rgba(255,255,255,0.38)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              fontFamily: "'Sora', sans-serif",
              transition: 'transform 0.22s ease, background-color 0.18s ease, box-shadow 0.18s ease',
              display: 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
              Search Donors →
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: 36,
            flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.65s',
          }}>
            <HeroStat target={10000} suffix="+" label="Donors" started={visible} />
            <HeroStat target={3500} suffix="+" label="Lives Saved" started={visible} />
            <HeroStat target={64} suffix="" label="Districts" started={visible} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          zIndex: 10,
          opacity: visible ? 0.7 : 0,
          transition: 'opacity 1s ease',
          transitionDelay: '1.2s',
        }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', opacity: 0.7 }}>Scroll</span>
        <div style={{ width: 2, height: 40, borderRadius: 2, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.3)' }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#FFB33F',
            animation: 'scrollPulse 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float-drop {
          0%,100% { transform: translateY(-50%) rotate(-2deg); }
          50% { transform: translateY(-53%) translateX(10px) rotate(2.5deg); }
        }
        @keyframes orb-a {
          0%,100% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.05) translateY(-16px); }
        }
        @keyframes orb-b {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(14px); }
        }
        @keyframes pulse-live {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,179,63,0.7); }
          50% { box-shadow: 0 0 0 7px rgba(255,179,63,0); }
        }
        @keyframes scrollPulse {
          0% { height: 0%; opacity: 1; }
          50% { height: 70%; opacity: 0.8; }
          100% { height: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;