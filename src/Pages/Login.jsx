// src/Pages/Login.jsx
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../Firebase/firebase.config';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const inputStyle = {
  width:'100%', padding:'12px 14px', borderRadius:10,
  border:'1px solid var(--border)', backgroundColor:'var(--bg-base)',
  color:'var(--text-primary)', fontSize:14, fontFamily:FB,
  outline:'none', boxSizing:'border-box', transition:'border-color 0.18s',
};

const DEMO_ACCOUNTS = [
  { label:'Demo Donor', email:'donor@bloodlink.com', password:'Donor@123', icon:'👤' },
  { label:'Demo Admin', email:'admin@bloodlink.com', password:'Admin@123', icon:'🛡️' },
];

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const location    = useLocation();
  const navigate    = useNavigate();
  const cardRef     = useRef(null);

  const [email,        setEmail]        = useState('');
  const [pass,         setPass]         = useState('');
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');
  const [resetOpen,    setResetOpen]    = useState(false);
  const [resetEmail,   setResetEmail]   = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg,     setResetMsg]     = useState({ type: '', text: '' });

  useEffect(() => {
    (async () => {
      try {
        const mod  = await import('gsap');
        const gsap = mod.gsap || mod.default;
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 36, scale: 0.97 },
          { opacity: 1, y: 0,  scale: 1, duration: 0.55, ease: 'power3.out', delay: 0.05 }
        );
      } catch {
        if (cardRef.current) cardRef.current.style.opacity = '1';
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then(cred => {
        setUser(cred.user);
        toast.success('Login successful!');
        navigate(location.state ?? '/');
      })
      .catch(() => {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      });
  };

  const fillDemo = (account) => {
    setEmail(account.email);
    setPass(account.password);
    setError('');
  };

  const openReset = (e) => {
    e.preventDefault();
    setResetEmail(email);
    setResetMsg({ type: '', text: '' });
    setResetOpen(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetLoading(true);
    setResetMsg({ type: '', text: '' });
    sendPasswordResetEmail(auth, resetEmail.trim())
      .then(() => {
        setResetMsg({ type: 'success', text: 'Reset email sent! Check your inbox (and spam folder).' });
        setResetLoading(false);
      })
      .catch((err) => {
        const msg =
          err.code === 'auth/user-not-found' ? 'No account found with this email address.' :
          err.code === 'auth/invalid-email'  ? 'Please enter a valid email address.' :
                                               'Something went wrong. Please try again.';
        setResetMsg({ type: 'error', text: msg });
        setResetLoading(false);
      });
  };

  return (
    <>
      {/* ── Forgot Password Modal ─────────────────────────────────────────── */}
      {resetOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setResetOpen(false); }}
          style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000, padding:16, backdropFilter:'blur(4px)' }}
        >
          <div style={{ backgroundColor:'var(--bg-base)', borderRadius:20, padding:'32px 28px', maxWidth:400, width:'100%', border:'1px solid var(--border)', boxShadow:'0 24px 64px rgba(0,0,0,0.3)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <div>
                <h2 style={{ fontFamily:FD, fontWeight:700, fontSize:18, color:'var(--text-primary)', margin:'0 0 4px' }}>Reset Password</h2>
                <p style={{ fontFamily:FB, fontSize:13, color:'var(--text-muted)', margin:0 }}>We'll send a reset link to your email</p>
              </div>
              <button onClick={() => setResetOpen(false)}
                style={{ width:32, height:32, borderRadius:8, border:'none', backgroundColor:'var(--bg-muted)', color:'var(--text-muted)', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>
                ×
              </button>
            </div>

            {resetMsg.text && (
              <div style={{
                padding:'12px 14px', borderRadius:10, marginBottom:16, fontSize:13, fontFamily:FB,
                backgroundColor: resetMsg.type === 'success' ? 'rgba(22,101,52,0.1)' : 'rgba(192,7,7,0.1)',
                border: `1px solid ${resetMsg.type === 'success' ? 'rgba(22,101,52,0.25)' : 'rgba(192,7,7,0.2)'}`,
                color: resetMsg.type === 'success' ? '#166534' : '#C00707',
              }}>
                {resetMsg.text}
              </div>
            )}

            {resetMsg.type !== 'success' && (
              <form onSubmit={handleReset} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div>
                  <label htmlFor="reset-email" style={{ display:'block', marginBottom:7, fontFamily:FB, fontWeight:600, fontSize:13, color:'var(--text-primary)' }}>
                    Email Address
                  </label>
                  <input
                    id="reset-email" type="email" required placeholder="you@example.com"
                    value={resetEmail} onChange={e => setResetEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#C00707'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button type="button" onClick={() => setResetOpen(false)}
                    style={{ flex:1, padding:'11px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontFamily:FD, fontWeight:600, fontSize:13, cursor:'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={resetLoading}
                    style={{ flex:1, padding:'11px', borderRadius:10, border:'none', background: resetLoading ? 'var(--bg-muted)' : 'linear-gradient(135deg,#C00707,#FF4400)', color: resetLoading ? 'var(--text-muted)' : '#fff', fontFamily:FD, fontWeight:700, fontSize:13, cursor: resetLoading ? 'not-allowed' : 'pointer' }}>
                    {resetLoading ? 'Sending…' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}

            {resetMsg.type === 'success' && (
              <button onClick={() => setResetOpen(false)}
                style={{ width:'100%', padding:'11px', borderRadius:10, border:'none', backgroundColor:'#166534', color:'#fff', fontFamily:FD, fontWeight:700, fontSize:13, cursor:'pointer', marginTop:4 }}>
                Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Login Page ────────────────────────────────────────────────────── */}
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'var(--bg-base)', padding:'24px 16px', fontFamily:FB }}>

        {/* Background orbs */}
        <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
          <div style={{ position:'absolute', top:'-20%', right:'-10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(192,7,7,0.08),transparent 70%)' }} />
          <div style={{ position:'absolute', bottom:'-15%', left:'-10%', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle,rgba(19,78,142,0.07),transparent 70%)' }} />
        </div>

        <div ref={cardRef} style={{ position:'relative', zIndex:1, width:'100%', maxWidth:440, opacity:0 }}>

          {/* Logo */}
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div style={{ fontFamily:FD, fontWeight:800, fontSize:28, marginBottom:6, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <span style={{ fontSize:26 }}>🩸</span>
              <span>
                <span style={{ color:'#C00707' }}>BLOOD</span>
                <span style={{ color:'#134E8E' }}>LINK</span>
              </span>
            </div>
            <p style={{ color:'var(--text-muted)', fontSize:14 }}>Sign in to your account</p>
          </div>

          {/* Demo login buttons */}
          <div style={{ marginBottom:20 }}>
            <p style={{ textAlign:'center', fontSize:11, fontWeight:700, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:FD, marginBottom:10 }}>
              Quick Demo Access
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {DEMO_ACCOUNTS.map(acc => (
                <button key={acc.label} onClick={() => fillDemo(acc)}
                  style={{ padding:'10px 12px', borderRadius:12, border:'1.5px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-primary)', fontFamily:FD, fontWeight:600, fontSize:12, cursor:'pointer', transition:'all 0.18s', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C00707'; e.currentTarget.style.color = '#C00707'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                >
                  <span>{acc.icon}</span>{acc.label}
                </button>
              ))}
            </div>
            <p style={{ textAlign:'center', fontSize:11, color:'var(--text-faint)', fontFamily:FB, marginTop:8 }}>
              Clicking fills the form — then press Sign In
            </p>
          </div>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <div style={{ flex:1, height:1, backgroundColor:'var(--border)' }} />
            <span style={{ fontSize:11, color:'var(--text-faint)', fontFamily:FB }}>or sign in manually</span>
            <div style={{ flex:1, height:1, backgroundColor:'var(--border)' }} />
          </div>

          {/* Card */}
          <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:20, padding:'32px 28px', boxShadow:'0 8px 32px rgba(0,0,0,0.12)' }}>

            {error && (
              <div style={{ padding:'12px 14px', borderRadius:10, backgroundColor:'rgba(192,7,7,0.1)', border:'1px solid rgba(192,7,7,0.2)', color:'#C00707', fontSize:13, marginBottom:18, fontFamily:FB }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <div>
                <label htmlFor="login-email" style={{ display:'block', marginBottom:7, fontFamily:FB, fontWeight:600, fontSize:13, color:'var(--text-primary)' }}>
                  Email Address
                </label>
                <input
                  id="login-email" name="email" type="email" placeholder="you@example.com" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#C00707'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
                  <label htmlFor="login-pass" style={{ fontFamily:FB, fontWeight:600, fontSize:13, color:'var(--text-primary)' }}>
                    Password
                  </label>
                  <button type="button" onClick={openReset}
                    style={{ fontSize:12, color:'#C00707', fontFamily:FB, background:'none', border:'none', cursor:'pointer', padding:0 }}>
                    Forgot password?
                  </button>
                </div>
                <input
                  id="login-pass" name="password" type="password" placeholder="••••••••" required
                  value={pass} onChange={e => setPass(e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#C00707'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <button type="submit" disabled={loading}
                style={{ padding:'13px', borderRadius:12, border:'none', background: loading ? 'var(--bg-muted)' : 'linear-gradient(135deg,#C00707,#FF4400)', color: loading ? 'var(--text-muted)' : '#fff', fontFamily:FD, fontWeight:700, fontSize:15, cursor: loading ? 'not-allowed' : 'pointer', transition:'transform 0.2s, opacity 0.18s', marginTop:4 }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div style={{ marginTop:22, textAlign:'center', fontSize:13, color:'var(--text-muted)', fontFamily:FB }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color:'#C00707', textDecoration:'none', fontWeight:600 }}>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;