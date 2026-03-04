import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router';

/* ─────────────────────────────────────────────
   Heartbeat Loader — shown while Firebase auth
   state resolves. Pure CSS, zero dependencies.
───────────────────────────────────────────── */
const LOADER_CSS = `
  @keyframes hb-pulse {
    0%   { transform: scale(1);    opacity: 1;   }
    14%  { transform: scale(1.25); opacity: 1;   }
    28%  { transform: scale(1);    opacity: 1;   }
    42%  { transform: scale(1.15); opacity: 1;   }
    70%  { transform: scale(1);    opacity: 0.6; }
    100% { transform: scale(1);    opacity: 0.6; }
  }

  @keyframes hb-ring {
    0%   { transform: scale(0.7); opacity: 0.7; }
    60%  { transform: scale(1.8); opacity: 0;   }
    100% { transform: scale(1.8); opacity: 0;   }
  }

  @keyframes hb-ring2 {
    0%   { transform: scale(0.7); opacity: 0.5; }
    60%  { transform: scale(1.8); opacity: 0;   }
    100% { transform: scale(1.8); opacity: 0;   }
  }

  @keyframes hb-dots {
    0%, 80%, 100% { transform: scaleY(0.4); opacity: 0.3; }
    40%            { transform: scaleY(1.0); opacity: 1;   }
  }

  @keyframes hb-fadein {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0);   }
  }

  .hb-wrap {
    position: fixed; inset: 0; z-index: 9998;
    background: var(--bg-base, #0f0f0f);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 28px;
    animation: hb-fadein 0.25s ease both;
  }

  .hb-drop-wrap {
    position: relative;
    width: 80px; height: 80px;
    display: flex; align-items: center; justify-content: center;
  }

  /* Expanding rings */
  .hb-ring {
    position: absolute; inset: 0;
    border-radius: 50%;
    border: 2px solid #C00707;
    animation: hb-ring 1.6s ease-out infinite;
  }
  .hb-ring:nth-child(2) {
    animation: hb-ring2 1.6s ease-out infinite 0.4s;
    border-color: #FF4400;
  }

  /* Blood drop SVG */
  .hb-drop {
    position: relative; z-index: 1;
    width: 44px; height: 44px;
    animation: hb-pulse 1.6s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(192,7,7,0.7));
  }

  /* Logo text */
  .hb-logo {
    font-family: Inter, system-ui, -apple-system, sans-serif;
    font-weight: 800;
    font-size: 22px;
    letter-spacing: -0.02em;
    animation: hb-fadein 0.4s ease 0.15s both;
  }
  .hb-logo span:first-child { color: #C00707; }
  .hb-logo span:last-child  { color: #FFB33F; }

  /* Bouncing bar dots */
  .hb-bars {
    display: flex; gap: 5px; align-items: center;
    animation: hb-fadein 0.4s ease 0.3s both;
  }
  .hb-bar {
    width: 4px; height: 22px; border-radius: 2px;
    background: #C00707;
    animation: hb-dots 1.2s ease-in-out infinite;
    transform-origin: center bottom;
  }
  .hb-bar:nth-child(1) { animation-delay: 0s;    height: 14px; }
  .hb-bar:nth-child(2) { animation-delay: 0.15s; height: 22px; }
  .hb-bar:nth-child(3) { animation-delay: 0.3s;  height: 30px; background: #FF4400; }
  .hb-bar:nth-child(4) { animation-delay: 0.15s; height: 22px; }
  .hb-bar:nth-child(5) { animation-delay: 0s;    height: 14px; }

  .hb-label {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-faint, #555);
    animation: hb-fadein 0.4s ease 0.45s both;
  }
`;

const AuthLoader = () => (
  <>
    <style>{LOADER_CSS}</style>
    <div className="hb-wrap">

      {/* Pulsing blood drop with rings */}
      <div className="hb-drop-wrap">
        <div className="hb-ring" />
        <div className="hb-ring" />
        <svg className="hb-drop" viewBox="0 0 40 48" fill="none">
          <path
            d="M20 2 C20 2 3 20 3 31 C3 40.9 10.6 47 20 47 C29.4 47 37 40.9 37 31 C37 20 20 2 20 2Z"
            fill="url(#drop-grad)"
          />
          {/* Shine */}
          <path
            d="M11 26 C11 26 10 30 13 34"
            stroke="rgba(255,255,255,0.35)" strokeWidth="2.5"
            strokeLinecap="round" fill="none"
          />
          <defs>
            <linearGradient id="drop-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF4400" />
              <stop offset="100%" stopColor="#9B0000" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* BLOOD+ wordmark */}
      <div className="hb-logo">
        <span>BLOOD</span><span>+</span>
      </div>

      {/* Heartbeat bars */}
      <div className="hb-bars">
        <div className="hb-bar" />
        <div className="hb-bar" />
        <div className="hb-bar" />
        <div className="hb-bar" />
        <div className="hb-bar" />
      </div>

      <p className="hb-label">Verifying access</p>
    </div>
  </>
);

/* ─────────────────────────────────────────────
   PrivateRoute
───────────────────────────────────────────── */
const PrivateRoute = ({ children }) => {
  const { user, loading, roleloading, userStatus } = useContext(AuthContext);

  if (loading || roleloading) {
    return <AuthLoader />;
  }

  if (!user || userStatus !== 'active') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;