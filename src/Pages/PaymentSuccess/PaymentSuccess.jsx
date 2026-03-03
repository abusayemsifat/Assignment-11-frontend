import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxios from '../../hooks/useAxios';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosInstance = useAxios();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (sessionId) {
            axiosInstance.post(`/success-payment?session_id=${sessionId}`)
                .then(() => setVerified(true))
                .catch(err => { console.log(err); setVerified(true); });
        }
    }, [axiosInstance, sessionId]);

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'var(--bg-base)', padding: '24px 16px',
            fontFamily: FONT_BODY,
        }}>
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(22,101,52,0.08),transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(192,7,7,0.06),transparent 70%)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 440 }}>
                {/* Success icon */}
                <div style={{
                    width: 100, height: 100, borderRadius: '50%', margin: '0 auto 24px',
                    background: 'linear-gradient(135deg,rgba(22,101,52,0.2),rgba(22,101,52,0.1))',
                    border: '2px solid rgba(74,222,128,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 44,
                    animation: 'popIn 0.5s cubic-bezier(.175,.885,.32,1.275)',
                }}>
                    ✅
                </div>

                <h1 style={{
                    fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(24px,5vw,32px)',
                    color: 'var(--text-primary)', margin: '0 0 12px',
                }}>
                    Payment Successful!
                </h1>
                <p style={{
                    fontFamily: FONT_BODY, fontSize: 15, color: 'var(--text-muted)',
                    lineHeight: 1.6, margin: '0 0 32px',
                }}>
                    Thank you for your generous donation. Your contribution helps save lives and supports the BloodLink community.
                </p>

                <div style={{
                    backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)',
                    borderRadius: 16, padding: '20px', marginBottom: 28,
                }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
                        TRANSACTION REFERENCE
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                        {sessionId || 'N/A'}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/" style={{
                        padding: '12px 24px', borderRadius: 12, textDecoration: 'none',
                        background: 'linear-gradient(135deg,#C00707,#FF4400)',
                        color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14,
                    }}>
                        Back to Home
                    </Link>
                    <Link to="/dashboard" style={{
                        padding: '12px 24px', borderRadius: 12, textDecoration: 'none',
                        border: '1px solid var(--border)', backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--text-primary)', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14,
                    }}>
                        Dashboard
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes popIn {
                    from { transform: scale(0.5); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default PaymentSuccess;