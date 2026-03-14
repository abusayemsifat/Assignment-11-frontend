// src/Pages/Contact/Contact.jsx
import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import useAxios from '../../hooks/useAxios';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const CSS = `
  @keyframes ct-fade-up {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes ct-hero {
    from { opacity:0; transform:scale(1.03); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes ct-success-pop {
    0%   { opacity:0; transform:scale(0.8) translateY(10px); }
    70%  { transform:scale(1.04); }
    100% { opacity:1; transform:scale(1) translateY(0); }
  }
  .ct-hero   { animation: ct-hero   0.7s ease both; }
  .ct-title  { animation: ct-fade-up 0.6s ease 0.15s both; }
  .ct-sub    { animation: ct-fade-up 0.6s ease 0.28s both; }
  .ct-success { animation: ct-success-pop 0.5s cubic-bezier(.34,1.56,.64,1) both; }

  .ct-info-card {
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease !important;
  }
  .ct-info-card:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important;
  }

  .ct-submit-btn {
    transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), opacity 0.18s ease !important;
  }
  .ct-submit-btn:hover:not(:disabled) { transform: scale(1.03) !important; }
  .ct-submit-btn:active:not(:disabled) { transform: scale(0.97) !important; }
`;

const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 10,
  border: '1px solid var(--border)', backgroundColor: 'var(--bg-base)',
  color: 'var(--text-primary)', fontSize: 13, fontFamily: FB,
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.18s',
};
const labelStyle = {
  display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 700,
  color: 'var(--text-muted)', fontFamily: FD, textTransform: 'uppercase', letterSpacing: '0.06em',
};
const focus = e => e.target.style.borderColor = '#C00707';
const blur  = e => e.target.style.borderColor = 'var(--border)';

const contactInfo = [
  { icon: '📧', label: 'Email',    value: 'support@bloodlink.com',   sub: 'We reply within 24 hours' },
  { icon: '📞', label: 'Phone',    value: '+880 1XXX-XXXXXX',         sub: 'Sun–Thu, 9am–6pm' },
  { icon: '📍', label: 'Address',  value: 'Dhaka, Bangladesh',        sub: 'Dhanmondi, Dhaka-1205' },
  { icon: '🕐', label: 'Hours',    value: '24/7 Emergency Line',      sub: 'For urgent blood requests' },
];

const subjects = [
  'Blood Request Help',
  'Donor Registration Issue',
  'Technical Support',
  'Partnership Inquiry',
  'Feedback / Suggestion',
  'Other',
];

const EMPTY = { name: '', email: '', phone: '', subject: subjects[0], message: '' };

const Contact = () => {
  const axiosInstance = useAxios();
  const formRef = useScrollReveal();
  const infoRef = useScrollReveal();

  const [form, setForm]       = useState(EMPTY);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverErr, setServerErr] = useState('');

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())                        e.name    = 'Name is required';
    if (!form.email.trim())                       e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))   e.email   = 'Enter a valid email address';
    if (!form.message.trim())                     e.message = 'Please write a message';
    else if (form.message.trim().length < 20)     e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErr('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await axiosInstance.post('/contact', {
        name:    form.name.trim(),
        email:   form.email.trim(),
        phone:   form.phone.trim(),
        subject: form.subject,
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
      setForm(EMPTY);
    } catch (err) {
      setServerErr('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', fontFamily: FB }}>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="ct-hero" style={{
        background: 'linear-gradient(135deg,#7B0000,#C00707 55%,#FF4400)',
        padding: 'clamp(52px,8vw,88px) 24px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', top:'-20%', right:'-8%', width:340, height:340, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,255,255,0.07),transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:600, margin:'0 auto' }}>
          <h1 className="ct-title" style={{ fontFamily: FD, fontWeight: 800, fontSize: 'clamp(1.9rem,4.5vw,3rem)', color: '#fff', margin: '0 0 14px', lineHeight: 1.15 }}>
            Get in <span style={{ color: '#FFE0A0' }}>Touch</span>
          </h1>
          <p className="ct-sub" style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 1.72, margin: 0, fontFamily: FB }}>
            Have a question, need help with a blood request, or want to partner with us? We're here 24/7.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto" style={{ padding: '64px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 40, alignItems: 'start' }}>

        {/* ── FORM ── */}
        <div ref={formRef}>
          {success ? (
            <div className="ct-success" style={{ textAlign: 'center', padding: '48px 32px', backgroundColor: 'var(--bg-subtle)', border: '1px solid rgba(22,101,52,0.3)', borderRadius: 20 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h2 style={{ fontFamily: FD, fontWeight: 800, fontSize: 22, color: 'var(--text-primary)', margin: '0 0 10px' }}>Message Sent!</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 24px', lineHeight: 1.7, fontFamily: FB }}>
                Thank you for reaching out. We'll get back to you at <strong>{form.email || 'your email'}</strong> within 24 hours.
              </p>
              <button onClick={() => setSuccess(false)}
                style={{ padding: '11px 24px', borderRadius: 12, border: 'none', backgroundColor: '#C00707', color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <div style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 20, padding: '32px 28px' }}>
              <h2 data-reveal style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: 'var(--text-primary)', margin: '0 0 6px' }}>Send a Message</h2>
              <p data-reveal style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 28px', fontFamily: FB }}>Fill in the form below and we'll respond promptly.</p>

              {serverErr && (
                <div style={{ padding: '12px 16px', borderRadius: 10, backgroundColor: 'rgba(192,7,7,0.1)', border: '1px solid rgba(192,7,7,0.2)', color: '#C00707', fontSize: 13, marginBottom: 20, fontFamily: FB }}>
                  {serverErr}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Name */}
                <div>
                  <label htmlFor="ct-name" style={labelStyle}>Full Name *</label>
                  <input id="ct-name" type="text" value={form.name} onChange={set('name')} placeholder="Your full name"
                    style={{ ...inputStyle, borderColor: errors.name ? '#C00707' : 'var(--border)' }}
                    onFocus={focus} onBlur={blur} />
                  {errors.name && <p style={{ fontSize: 11, color: '#C00707', margin: '4px 0 0', fontFamily: FB }}>{errors.name}</p>}
                </div>

                {/* Email + Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14 }}>
                  <div>
                    <label htmlFor="ct-email" style={labelStyle}>Email Address *</label>
                    <input id="ct-email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com"
                      style={{ ...inputStyle, borderColor: errors.email ? '#C00707' : 'var(--border)' }}
                      onFocus={focus} onBlur={blur} />
                    {errors.email && <p style={{ fontSize: 11, color: '#C00707', margin: '4px 0 0', fontFamily: FB }}>{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="ct-phone" style={labelStyle}>Phone (optional)</label>
                    <input id="ct-phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+880 XXXXXXXXXX"
                      style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="ct-subject" style={labelStyle}>Subject</label>
                  <select id="ct-subject" value={form.subject} onChange={set('subject')}
                    style={inputStyle} onFocus={focus} onBlur={blur}>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="ct-msg" style={labelStyle}>Message *</label>
                  <textarea id="ct-msg" value={form.message} onChange={set('message')} rows={5}
                    placeholder="Tell us how we can help you..."
                    style={{ ...inputStyle, resize: 'vertical', borderColor: errors.message ? '#C00707' : 'var(--border)' }}
                    onFocus={focus} onBlur={blur} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    {errors.message
                      ? <p style={{ fontSize: 11, color: '#C00707', margin: 0, fontFamily: FB }}>{errors.message}</p>
                      : <span />
                    }
                    <p style={{ fontSize: 11, color: form.message.length < 20 ? '#C00707' : 'var(--text-faint)', margin: 0, fontFamily: FB }}>{form.message.length}/20 min</p>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="ct-submit-btn"
                  style={{ padding: '13px', borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                    background: loading ? 'var(--bg-muted)' : 'linear-gradient(135deg,#C00707,#FF4400)',
                    color: loading ? 'var(--text-muted)' : '#fff',
                    fontFamily: FD, fontWeight: 700, fontSize: 15, marginTop: 4,
                  }}>
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* ── INFO CARDS ── */}
        <div ref={infoRef} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div data-reveal style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: 'var(--text-primary)', margin: '0 0 6px' }}>Contact Information</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, fontFamily: FB }}>Reach out through any of these channels.</p>
          </div>

          {contactInfo.map((info, i) => (
            <div key={i} className="ct-info-card" data-reveal data-reveal-delay={`${i * 80}`}
              style={{ display: 'flex', gap: 16, padding: '18px 20px', borderRadius: 16, backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(192,7,7,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{info.icon}</div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#C00707', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: FD, margin: '0 0 3px' }}>{info.label}</p>
                <p style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', margin: '0 0 2px' }}>{info.value}</p>
                <p style={{ fontSize: 12, color: 'var(--text-faint)', margin: 0, fontFamily: FB }}>{info.sub}</p>
              </div>
            </div>
          ))}

          {/* Emergency notice */}
          <div data-reveal data-reveal-delay="320" style={{ padding: '18px 20px', borderRadius: 16, background: 'linear-gradient(135deg,rgba(192,7,7,0.12),rgba(255,68,0,0.08))', border: '1px solid rgba(192,7,7,0.25)' }}>
            <p style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: '#C00707', margin: '0 0 6px' }}>🚨 Emergency Blood Request?</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 14px', fontFamily: FB, lineHeight: 1.65 }}>
              Don't wait — post a request directly on the platform. Donors are notified instantly.
            </p>
            <a href="/all-requests" style={{ fontSize: 13, fontWeight: 700, color: '#C00707', textDecoration: 'none', fontFamily: FD, borderBottom: '1.5px solid rgba(192,7,7,0.4)' }}>
              Post Emergency Request →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;