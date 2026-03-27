// src/components/Hero/Hero.jsx
// ─────────────────────────────────────────────────────────────────
// Bold editorial hero — split layout, animated stats counter,
// floating blood drops, diagonal cut, staggered fade-in
// Uses: React + Tailwind v4 + your CSS variables + brand colors
// ─────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import heroimg from '../../assets/Blood-Donation-1.jpg';

// ── Animated counter hook ────────────────────────────────────────
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

// ── Single stat block ────────────────────────────────────────────
function StatBlock({ value, suffix = '', label, color, started }) {
  const count = useCounter(value, 2200, started);
  return (
    <div className="flex flex-col">
      <span className="font-['Sora'] font-black leading-none"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color }}>
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-xs font-semibold uppercase tracking-widest mt-1"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
        {label}
      </span>
    </div>
  );
}

// ── Floating blood drop SVG ──────────────────────────────────────
function BloodDrop({ style }) {
  return (
    <svg viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg"
         style={style}>
      <path d="M20 2C20 2 4 18 4 30C4 39.941 11.163 48 20 48C28.837 48 36 39.941 36 30C36 18 20 2 20 2Z"
            fill="currentColor" opacity="0.15" />
      <path d="M20 10C20 10 8 22 8 30C8 37.18 13.373 43 20 43C26.627 43 32 37.18 32 30C32 22 20 10 20 10Z"
            fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// HERO COMPONENT
// ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  // Trigger entrance animations + counter on mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ minHeight: '92vh', backgroundColor: '#0a0a0a' }}
    >
      {/* ── Background image with deep overlay ──────────────── */}
      <div className="absolute inset-0">
        <img
          src={heroimg}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'saturate(0.4) brightness(0.35)' }}
        />
        {/* Diagonal red gradient from left */}
        <div className="absolute inset-0"
             style={{
               background: 'linear-gradient(115deg, rgba(192,7,7,0.92) 0%, rgba(192,7,7,0.7) 30%, rgba(10,10,10,0.15) 65%, transparent 100%)'
             }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32"
             style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }} />
      </div>

      {/* ── Floating blood drops (decorative) ───────────────── */}
      {[
        { top: '8%',  left: '55%', size: 60,  delay: '0s',   duration: '6s'  },
        { top: '20%', left: '72%', size: 40,  delay: '1s',   duration: '8s'  },
        { top: '45%', left: '62%', size: 80,  delay: '0.5s', duration: '7s'  },
        { top: '65%', left: '80%', size: 35,  delay: '2s',   duration: '9s'  },
        { top: '15%', left: '88%', size: 55,  delay: '1.5s', duration: '6.5s'},
        { top: '75%', left: '68%', size: 45,  delay: '0.8s', duration: '7.5s'},
      ].map((drop, i) => (
        <BloodDrop key={i} style={{
          position: 'absolute',
          top: drop.top,
          left: drop.left,
          width: drop.size,
          height: drop.size * 1.3,
          color: '#C00707',
          animation: `float ${drop.duration} ease-in-out infinite alternate`,
          animationDelay: drop.delay,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Diagonal divider line ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
             className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
          <line x1="45" y1="0" x2="55" y2="100" stroke="#C00707" strokeWidth="0.3" />
          <line x1="47" y1="0" x2="57" y2="100" stroke="#FF4400" strokeWidth="0.15" />
        </svg>
      </div>

      {/* ── Glowing orb behind text ──────────────────────────── */}
      <div className="absolute pointer-events-none"
           style={{
             top: '20%', left: '-5%',
             width: '500px', height: '500px',
             background: 'radial-gradient(circle, rgba(192,7,7,0.2) 0%, transparent 70%)',
             borderRadius: '50%',
             filter: 'blur(40px)',
           }} />

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
                      flex flex-col justify-center"
           style={{ minHeight: '92vh', paddingTop: '5rem', paddingBottom: '5rem' }}>

        <div className="max-w-2xl">

          {/* Eyebrow label */}
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '0.1s',
            }}
          >
            <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: '#FFB33F' }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: '#FFB33F' }}>
              Bangladesh's Largest Blood Network
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-['Sora'] font-black leading-[1.05] mb-6"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              color: '#ffffff',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.2s',
            }}
          >
            Your Blood.
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #FF4400, #FFB33F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Someone's Life.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg leading-relaxed mb-10 max-w-lg"
            style={{
              color: 'rgba(255,255,255,0.65)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.35s',
            }}
          >
            Every 2 seconds someone in Bangladesh needs blood.
            Register as a donor or find life-saving blood in your district — right now.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-4 mb-16"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.5s',
            }}
          >
            <Link to="/signup"
              className="group relative inline-flex items-center gap-2.5 px-7 py-4
                         rounded-2xl font-bold text-base overflow-hidden"
              style={{ backgroundColor: '#C00707', color: '#fff' }}
            >
              {/* Shine sweep on hover */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                               transition-transform duration-500"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
              <span className="text-lg">🩸</span>
              <span>Become a Donor</span>
              <span className="opacity-60 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>

            <Link to="/search"
              className="group inline-flex items-center gap-2.5 px-7 py-4
                         rounded-2xl font-bold text-base transition-all duration-200"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              <span className="text-lg">🔍</span>
              <span>Find Donors</span>
            </Link>
          </div>

          {/* ── Stats row ──────────────────────────────────── */}
          <div
            className="flex flex-wrap gap-8 pt-8"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0.65s',
            }}
          >
            <StatBlock value={10000} suffix="+" label="Registered Donors" color="#FFB33F" started={visible} />
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <StatBlock value={3500}  suffix="+" label="Lives Saved"        color="#FF4400" started={visible} />
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <StatBlock value={64}    suffix=""  label="Districts Covered"  color="#C00707" started={visible} />
          </div>
        </div>

        {/* ── Right side: blood group availability card ─────── */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: '0.7s',
          }}
        >
          <div className="rounded-3xl p-5 w-64"
               style={{
                 backgroundColor: 'rgba(255,255,255,0.05)',
                 border: '1px solid rgba(255,255,255,0.1)',
                 backdropFilter: 'blur(20px)',
               }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4"
               style={{ color: 'rgba(255,255,255,0.4)' }}>
              🩸 Live Availability
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { g: 'A+',  n: 12, c: '#C00707' },
                { g: 'A-',  n: 5,  c: '#FF4400' },
                { g: 'B+',  n: 18, c: '#134E8E' },
                { g: 'B-',  n: 3,  c: '#FFB33F' },
                { g: 'O+',  n: 24, c: '#C00707' },
                { g: 'O-',  n: 7,  c: '#FF4400' },
                { g: 'AB+', n: 9,  c: '#134E8E' },
                { g: 'AB-', n: 2,  c: '#FFB33F' },
              ].map(bg => (
                <Link to={`/search?blood=${bg.g}`} key={bg.g}
                  className="flex flex-col items-center justify-center rounded-xl py-2.5 px-1
                             transition-all duration-150 cursor-pointer"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${bg.c}22`; e.currentTarget.style.borderColor = bg.c; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                >
                  <span className="font-['Sora'] font-black text-sm" style={{ color: bg.c }}>{bg.g}</span>
                  <span className="text-[9px] font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{bg.n}</span>
                </Link>
              ))}
            </div>
            <Link to="/search"
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                         text-xs font-bold transition-all duration-150"
              style={{ backgroundColor: '#C00707', color: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#A00606'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C00707'}
            >
              View All Donors →
            </Link>
          </div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: visible ? 0.4 : 0,
            transition: 'opacity 1s ease',
            transitionDelay: '1.2s',
          }}
        >
          <span className="text-[10px] uppercase tracking-widest" style={{ color: '#fff' }}>Scroll</span>
          <div className="w-[1px] h-8 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <div style={{
              width: '100%', backgroundColor: '#C00707',
              animation: 'scrollPulse 1.8s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>

      {/* ── CSS animations ───────────────────────────────────── */}
      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(-5deg); }
          to   { transform: translateY(-18px) rotate(5deg); }
        }
        @keyframes scrollPulse {
          0%   { height: 0%;   opacity: 1; }
          100% { height: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;