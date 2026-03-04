import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../Firebase/firebase.config';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    border: '1px solid var(--border)', backgroundColor: 'var(--bg-base)',
    color: 'var(--text-primary)', fontSize: 14, fontFamily: FONT_BODY,
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.18s',
};

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const cardRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                const mod = await import('gsap');
                const gsap = mod.gsap || mod.default;
                gsap.fromTo(cardRef.current,
                    { opacity: 0, y: 36, scale: 0.97 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', delay: 0.05 }
                );
            } catch {
                if (cardRef.current) { cardRef.current.style.opacity = '1'; }
            }
        })();
    }, []);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const pass = e.target.password.value;
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                setUser(userCredential.user);
                toast.success('Login Successful!');
                navigate(location.state ? location.state : '/');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Invalid email or password');
                setLoading(false);
            });
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'var(--bg-base)', padding: '24px 16px',
            fontFamily: FONT_BODY,
        }}>
            {/* Background decoration */}
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(192,7,7,0.08),transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(19,78,142,0.07),transparent 70%)' }} />
            </div>

            <div ref={cardRef} style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420, opacity: 0 }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 28, marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <span style={{ fontSize: 26 }}>🩸</span>
                        <span>
                            <span style={{ color: '#C00707' }}>BLOOD</span>
                            <span style={{ color: 'var(--brand-amber, #FFB33F)' }}>+</span>
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Sign in to your account</p>
                </div>

                {/* Card */}
                <div style={{
                    backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)',
                    borderRadius: 20, padding: '32px 28px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 7, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
                                Email Address
                            </label>
                            <input
                                name="email" type="email" placeholder="you@example.com" required
                                onChange={e => setEmail(e.target.value)}
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = '#C00707'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                                <label style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>Password</label>
                                <Link to={`/forget/${email}`} style={{ fontSize: 12, color: '#C00707', textDecoration: 'none', fontFamily: FONT_BODY }}>Forgot password?</Link>
                            </div>
                            <input
                                name="password" type="password" placeholder="••••••••" required
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = '#C00707'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>

                        <button
                            type="submit" disabled={loading}
                            style={{
                                padding: '13px', borderRadius: 12, border: 'none',
                                background: loading ? 'var(--bg-muted)' : 'linear-gradient(135deg,#C00707,#FF4400)',
                                color: loading ? 'var(--text-muted)' : '#fff',
                                fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15,
                                cursor: loading ? 'not-allowed' : 'pointer', transition: 'opacity 0.18s',
                                marginTop: 4,
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div style={{ marginTop: 22, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', fontFamily: FONT_BODY }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ color: '#C00707', textDecoration: 'none', fontWeight: 600 }}>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;