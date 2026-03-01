import { useContext, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../Provider/AuthProvider';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";

const PRESET_AMOUNTS = [100, 250, 500, 1000, 2500, 5000];

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckOut = (e) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    setLoading(true);
    const formData = {
      donateAmount: amount,
      donorEmail:   user?.email,
      donorName:    user?.displayName,
    };
    axiosInstance.post('/create-payment-checkout', formData)
      .then(res => { window.location.href = res.data.url; })
      .catch(err => { console.log(err); setLoading(false); });
  };

  return (
    <div style={{ backgroundColor:'var(--bg-base)', minHeight:'100vh', fontFamily:FONT_BODY }}>

      {/* Header */}
      <section style={{ background:'linear-gradient(135deg,#C00707,#FF4400)', padding:'48px 24px 40px' }}>
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:'clamp(1.75rem,4vw,2.75rem)', color:'#fff', margin:'0 0 8px' }}>
            Donate to Save Lives
          </h1>
          <p style={{ color:'rgba(255,255,255,0.8)', fontFamily:FONT_BODY, margin:0 }}>
            Your donation helps us maintain and grow the Blood+ platform
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto" style={{ padding:'48px 24px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:32, alignItems:'start' }}>

        {/* Donation form */}
        <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:20, padding:32 }}>
          <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:22, color:'var(--text-primary)', margin:'0 0 8px' }}>Make a Donation</h2>
          <p style={{ fontSize:13, color:'var(--text-muted)', margin:'0 0 24px', fontFamily:FONT_BODY }}>Choose an amount or enter a custom value</p>

          {/* Preset amounts */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:20 }}>
            {PRESET_AMOUNTS.map(preset => (
              <button key={preset} type="button"
                onClick={() => setAmount(String(preset))}
                style={{
                  padding:'12px 8px', borderRadius:12, border:`2px solid ${amount === String(preset) ? '#C00707' : 'var(--border)'}`,
                  backgroundColor: amount === String(preset) ? '#C00707' : 'var(--bg-base)',
                  color: amount === String(preset) ? '#fff' : 'var(--text-primary)',
                  fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:14, cursor:'pointer', transition:'all 0.15s',
                }}
                onMouseEnter={e => { if(amount !== String(preset)) { e.currentTarget.style.borderColor = '#C00707'; e.currentTarget.style.color = '#C00707'; }}}
                onMouseLeave={e => { if(amount !== String(preset)) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}}
              >
                ৳{preset.toLocaleString()}
              </button>
            ))}
          </div>

          <form onSubmit={handleCheckOut}>
            {/* Donor info (read-only) */}
            <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:20 }}>
              <div>
                <label style={{ display:'block', marginBottom:6, fontSize:12, fontWeight:700, color:'var(--text-muted)', fontFamily:FONT_DISPLAY, textTransform:'uppercase', letterSpacing:0.5 }}>
                  Your Name
                </label>
                <input value={user?.displayName || ''} readOnly style={{
                  width:'100%', padding:'11px 14px', borderRadius:12,
                  border:'1px solid var(--border)', backgroundColor:'var(--bg-muted)',
                  color:'var(--text-muted)', fontSize:13, fontFamily:FONT_BODY, outline:'none', boxSizing:'border-box',
                }} />
              </div>
              <div>
                <label style={{ display:'block', marginBottom:6, fontSize:12, fontWeight:700, color:'var(--text-muted)', fontFamily:FONT_DISPLAY, textTransform:'uppercase', letterSpacing:0.5 }}>
                  Your Email
                </label>
                <input value={user?.email || ''} readOnly style={{
                  width:'100%', padding:'11px 14px', borderRadius:12,
                  border:'1px solid var(--border)', backgroundColor:'var(--bg-muted)',
                  color:'var(--text-muted)', fontSize:13, fontFamily:FONT_BODY, outline:'none', boxSizing:'border-box',
                }} />
              </div>
              <div>
                <label style={{ display:'block', marginBottom:6, fontSize:12, fontWeight:700, color:'var(--text-muted)', fontFamily:FONT_DISPLAY, textTransform:'uppercase', letterSpacing:0.5 }}>
                  Amount (BDT) *
                </label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'var(--text-muted)', fontFamily:FONT_DISPLAY, fontWeight:700 }}>৳</span>
                  <input
                    name="donateAmount"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                    min={1}
                    style={{
                      width:'100%', padding:'11px 14px 11px 32px', borderRadius:12,
                      border:'1px solid var(--border)', backgroundColor:'var(--bg-base)',
                      color:'var(--text-primary)', fontSize:13, fontFamily:FONT_BODY, outline:'none', boxSizing:'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = '#C00707'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading || !amount}
              style={{
                width:'100%', padding:'14px 20px', borderRadius:12, border:'none',
                backgroundColor: (!amount || loading) ? 'var(--bg-muted)' : '#C00707',
                color: (!amount || loading) ? 'var(--text-faint)' : '#fff',
                fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:15, cursor: (!amount || loading) ? 'not-allowed' : 'pointer',
                transition:'background 0.15s',
              }}
              onMouseEnter={e => { if(amount && !loading) e.currentTarget.style.backgroundColor = '#A00606'; }}
              onMouseLeave={e => { if(amount && !loading) e.currentTarget.style.backgroundColor = '#C00707'; }}
            >
              {loading ? '⏳ Processing...' : `🩸 Donate ${amount ? '৳' + Number(amount).toLocaleString() : ''}`}
            </button>
          </form>

          <p style={{ fontSize:11, color:'var(--text-faint)', marginTop:12, textAlign:'center', fontFamily:FONT_BODY }}>
            🔒 Secure payment powered by Stripe
          </p>
        </div>

        {/* Why donate */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:20, padding:28 }}>
            <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:18, color:'var(--text-primary)', margin:'0 0 16px' }}>
              Why Your Donation Matters
            </h3>
            {[
              { icon:'🖥️', title:'Platform Maintenance',   desc:'Keeps Blood+ running 24/7 so donors and recipients can connect anytime.' },
              { icon:'📣', title:'Awareness Campaigns',    desc:'Funds outreach programs to recruit more donors across Bangladesh.' },
              { icon:'🏥', title:'Hospital Partnerships',  desc:'Helps us partner with more hospitals to expand our network.' },
              { icon:'📱', title:'App Development',        desc:'Enables new features that make finding blood even faster.' },
            ].map(item => (
              <div key={item.title} style={{ display:'flex', gap:14, marginBottom:16 }}>
                <span style={{ fontSize:24, flexShrink:0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 3px' }}>{item.title}</p>
                  <p style={{ fontSize:12, color:'var(--text-muted)', margin:0, lineHeight:1.5, fontFamily:FONT_BODY }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:20, padding:24, display:'flex', gap:16, flexWrap:'wrap' }}>
            {[['🔒','Secure Payment'],['💳','All Cards Accepted'],['✅','Trusted Platform']].map(([icon, label]) => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:18 }}>{icon}</span>
                <p style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', margin:0, fontFamily:FONT_DISPLAY }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;