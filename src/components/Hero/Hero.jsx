// src/components/Hero/Hero.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(64);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };
    getNavbarHeight();
    window.addEventListener('resize', getNavbarHeight);
    return () => window.removeEventListener('resize', getNavbarHeight);
  }, []);

  return (
    <section style={{
      background: 'linear-gradient(135deg, #7B0000 0%, #C00707 45%, #FF4400 80%, #FFB33F 100%)',
      minHeight: `calc(100vh - ${navbarHeight}px)`,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px 0',
    }}>
      {/* Floating orbs */}
      <div className="orb" style={{
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
      <div className="orb" style={{
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
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px', 
        width: '100%', 
        position: 'relative', 
        zIndex: 1,
      }}>
        {/* Mobile Layout */}
        <div className="mobile-layout" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}>
          {/* Image Section with Badges */}
          <div className="image-section" style={{
            width: '100%',
            maxWidth: '320px',
            margin: '0 auto',
            position: 'relative',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            transitionDelay: '0.3s',
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            }}>
              <img 
                src="https://surgmedia.com/wp-content/uploads/2020/10/2171-blood-donation.jpg"
                alt="Blood donation"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(192,7,7,0.2) 0%, rgba(255,68,0,0.1) 100%)',
              }} />
            </div>

            {/* Mobile Badges - Smaller version */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-8px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(8px)',
              padding: '6px 12px',
              borderRadius: '40px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              animation: 'float-badge 3s ease-in-out infinite',
            }}>
              <span style={{ fontSize: '16px' }}>🩸</span>
              <div>
                <p style={{ margin: 0, fontSize: '8px', color: '#666' }}>Available</p>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#C00707' }}>O+ • A+ • B+</p>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-8px',
              left: '-8px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(8px)',
              padding: '5px 10px',
              borderRadius: '40px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              animation: 'float-badge 4s ease-in-out infinite',
              animationDelay: '0.5s',
            }}>
              <span style={{ fontSize: '14px' }}>❤️</span>
              <p style={{ margin: 0, fontSize: '10px', fontWeight: 600, color: '#C00707' }}>3,500+ Lives</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="content-section" style={{
            textAlign: 'center',
            width: '100%',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.16)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              padding: '5px 12px',
              borderRadius: 99,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
              fontFamily: "'Sora', sans-serif",
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '0.1s',
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#FFB33F',
                display: 'inline-block',
                animation: 'pulse-live 1.8s ease infinite',
              }} />
              Save Lives Today
            </div>

            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 12px',
              fontSize: 'clamp(28px, 7vw, 48px)',
              lineHeight: 1.2,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.2s',
            }}>
              Every Drop Counts.<br />
              <span style={{ color: '#FFE0A0' }}>Be a Hero.</span>
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: 1.6,
              margin: '0 0 24px',
              padding: '0 8px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.35s',
            }}>
              Bangladesh's largest blood donation network. Connect with donors, post urgent requests, and save lives — all in one place.
            </p>

            <div style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.5s',
            }}>
              <Link to="/signup" style={{
                padding: '10px 24px',
                borderRadius: 10,
                background: '#fff',
                color: '#C00707',
                fontWeight: 700,
                fontSize: 'clamp(12px, 3.5vw, 14px)',
                textDecoration: 'none',
                fontFamily: "'Sora', sans-serif",
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                Join as a Donor
              </Link>
              <Link to="/search" style={{
                padding: '10px 24px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.14)',
                border: '2px solid rgba(255,255,255,0.4)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 'clamp(12px, 3.5vw, 14px)',
                textDecoration: 'none',
                fontFamily: "'Sora', sans-serif",
                transition: 'transform 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                Search Donors →
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="desktop-layout" style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 60,
        }}>
          <div style={{ flex: 1, maxWidth: '550px' }}>
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
            }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#FFB33F',
                display: 'inline-block',
                animation: 'pulse-live 1.8s ease infinite',
              }} />
              Save Lives Today
            </div>
            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 18px',
              fontSize: 'clamp(2rem,5.5vw,3.75rem)',
              lineHeight: 1.15,
            }}>
              Every Drop Counts.<br />
              <span style={{ color: '#FFE0A0' }}>Be a Hero.</span>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 17,
              lineHeight: 1.72,
              margin: '0 0 32px',
              maxWidth: 540,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Bangladesh's largest blood donation network. Connect with donors, post urgent requests, and save lives — all in one place.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
                transition: 'transform 0.22s ease',
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
                transition: 'transform 0.22s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                Search Donors →
              </Link>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: '480px', position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            }}>
              <img 
                src="https://surgmedia.com/wp-content/uploads/2020/10/2171-blood-donation.jpg"
                alt="Blood donation"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(192,7,7,0.2) 0%, rgba(255,68,0,0.1) 100%)',
              }} />
            </div>

            <div style={{
              position: 'absolute',
              top: '-15px',
              right: '-15px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              padding: '10px 18px',
              borderRadius: '50px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'float-badge 3s ease-in-out infinite',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
              <span style={{ fontSize: '22px' }}>🩸</span>
              <div>
                <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>Available Now</p>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#C00707' }}>O+ • A+ • B+</p>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-12px',
              left: '-15px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              padding: '8px 16px',
              borderRadius: '50px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              animation: 'float-badge 4s ease-in-out infinite',
              animationDelay: '0.5s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
              <span style={{ fontSize: '18px' }}>❤️</span>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#C00707' }}>3,500+ Lives Saved</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .mobile-layout {
            display: none !important;
          }
          .desktop-layout {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .mobile-layout {
            display: flex !important;
          }
          .desktop-layout {
            display: none !important;
          }
          .orb {
            display: none !important;
          }
        }
        
        @keyframes float-badge {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
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
      `}</style>
    </section>
  );
};

export default Hero;