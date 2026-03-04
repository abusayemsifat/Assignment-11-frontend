import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import axios from 'axios';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '1px solid var(--border)', backgroundColor: 'var(--bg-base)',
    color: 'var(--text-primary)', fontSize: 13, fontFamily: FONT_BODY,
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.18s',
};
const labelStyle = { display: 'block', marginBottom: 6, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' };
const focus = e => e.target.style.borderColor = '#C00707';
const blur = e => e.target.style.borderColor = 'var(--border)';

const Register = () => {
    const { registerWithEmailPassword, setUser } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([]);
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
            } catch { if (cardRef.current) cardRef.current.style.opacity = '1'; }
        })();
    }, []);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('./upazila.json').then(res => setUpazilas(res.data.upazilas));
        axios.get('./district.json').then(res => setDistricts(res.data.districts));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl;
        const file = photoUrl.files[0];
        const blood = e.target.blood.value;

        if (pass.length < 6) { setError('Password must be at least 6 characters'); setLoading(false); return; }
        if (!/[A-Z]/.test(pass)) { setError('Password must contain an uppercase letter'); setLoading(false); return; }
        if (!/[a-z]/.test(pass)) { setError('Password must contain a lowercase letter'); setLoading(false); return; }
        if (!file) { setError('Please select a profile photo'); setLoading(false); return; }

        try {
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=8e9f55218ce652e2b63014e113632992`,
                { image: file }, { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            const mainPhotoUrl = imgRes.data.data.display_url;
            const formData = { email, pass, name, mainPhotoUrl, blood, district, upazila };

            const userCredential = await registerWithEmailPassword(email, pass);
            await updateProfile(auth.currentUser, { displayName: name, photoURL: mainPhotoUrl });
            setUser(userCredential.user);
            await axios.post('https://backend-11-cyan.vercel.app//users', formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed');
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'var(--bg-base)', padding: '24px 16px', fontFamily: FONT_BODY,
        }}>
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(192,7,7,0.07),transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(19,78,142,0.06),transparent 70%)' }} />
            </div>

            <div ref={cardRef} style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 500, opacity: 0 }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 26, marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <span style={{ fontSize: 24 }}>🩸</span>
                        <span>
                            <span style={{ color: '#C00707' }}>BLOOD</span>
                            <span style={{ color: 'var(--brand-amber, #FFB33F)' }}>+</span>
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Create your donor account</p>
                </div>

                <div style={{
                    backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)',
                    borderRadius: 20, padding: '28px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}>
                    {error && (
                        <div style={{ padding: '11px 14px', borderRadius: 10, backgroundColor: 'rgba(192,7,7,0.12)', color: '#ef4444', fontFamily: FONT_BODY, fontSize: 13, marginBottom: 18 }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
                            <div>
                                <label style={labelStyle}>Full Name *</label>
                                <input name="name" type="text" required placeholder="Your full name" style={inputStyle} onFocus={focus} onBlur={blur} />
                            </div>
                            <div>
                                <label style={labelStyle}>Email *</label>
                                <input name="email" type="email" required placeholder="you@example.com" style={inputStyle} onFocus={focus} onBlur={blur} />
                            </div>
                            <div>
                                <label style={labelStyle}>Profile Photo *</label>
                                <input name="photoUrl" type="file" accept="image/*" required style={{ ...inputStyle, padding: '8px 12px' }} />
                            </div>
                            <div>
                                <label style={labelStyle}>Blood Group *</label>
                                <select name="blood" required style={inputStyle} onFocus={focus} onBlur={blur}>
                                    <option value="" disabled>Select blood group</option>
                                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>District *</label>
                                <select value={district} onChange={e => setDistrict(e.target.value)} required style={inputStyle} onFocus={focus} onBlur={blur}>
                                    <option value="" disabled>Select district</option>
                                    {districts.map(d => <option value={d.name} key={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Upazila *</label>
                                <select value={upazila} onChange={e => setUpazila(e.target.value)} required style={inputStyle} onFocus={focus} onBlur={blur}>
                                    <option value="" disabled>Select upazila</option>
                                    {upazilas.map(u => <option value={u.name} key={u.id}>{u.name}</option>)}
                                </select>
                            </div>
                            <div style={{ gridColumn: '1/-1' }}>
                                <label style={labelStyle}>Password *</label>
                                <input name="password" type="password" required placeholder="Min 6 chars, upper + lowercase" style={inputStyle} onFocus={focus} onBlur={blur} />
                                <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 5, fontFamily: FONT_BODY }}>
                                    Must be at least 6 characters with uppercase and lowercase letters
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            style={{
                                marginTop: 20, width: '100%', padding: '13px', borderRadius: 12, border: 'none',
                                background: loading ? 'var(--bg-muted)' : 'linear-gradient(135deg,#C00707,#FF4400)',
                                color: loading ? 'var(--text-muted)' : '#fff',
                                fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15,
                                cursor: loading ? 'not-allowed' : 'pointer', transition: 'opacity 0.18s',
                            }}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', fontFamily: FONT_BODY }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#C00707', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;