// PageLoader v2 — GSAP + Framer Motion ready
import { useEffect, useRef, useState } from 'react';

/**
 * PageLoader — full-screen intro shown on first app load.
 * Uses GSAP for blood-drop + text + progress bar reveal.
 * If GSAP isn't installed yet, falls back gracefully.
 */
const PageLoader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const dropRef = useRef(null);
    const textRef = useRef(null);
    const plusRef = useRef(null);
    const barRef = useRef(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const run = async () => {
            let gsap;
            try {
                const mod = await import('gsap');
                gsap = mod.gsap || mod.default;
            } catch {
                // GSAP not available — skip animation
                setTimeout(() => { setVisible(false); onComplete?.(); }, 400);
                return;
            }

            if (!dropRef.current) return;

            // Set initial hidden states
            gsap.set(dropRef.current,  { scale: 0, opacity: 0, y: -30 });
            gsap.set(textRef.current,  { opacity: 0, x: -18 });
            gsap.set(plusRef.current,  { opacity: 0, scale: 0, rotate: -90 });
            gsap.set(barRef.current,   { scaleX: 0, transformOrigin: 'left center' });

            const tl = gsap.timeline();

            tl
                .to(dropRef.current, {
                    scale: 1, opacity: 1, y: 0,
                    duration: 0.55, ease: 'back.out(1.7)',
                })
                .to(textRef.current, {
                    opacity: 1, x: 0,
                    duration: 0.38, ease: 'power3.out',
                }, '-=0.15')
                .to(plusRef.current, {
                    opacity: 1, scale: 1, rotate: 0,
                    duration: 0.32, ease: 'back.out(2.2)',
                }, '-=0.18')
                .to(barRef.current, {
                    scaleX: 1,
                    duration: 0.85, ease: 'power2.inOut',
                }, '-=0.1')
                .to({}, { duration: 0.3 }) // brief hold
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 0.38, ease: 'power2.inOut',
                    onComplete: () => {
                        setVisible(false);
                        onComplete?.();
                    },
                });
        };

        run();
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                backgroundColor: '#080808',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 24,
            }}
        >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div ref={dropRef} style={{ fontSize: 50, lineHeight: 1, userSelect: 'none' }}>
                    🩸
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <span
                        ref={textRef}
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            fontWeight: 800, fontSize: 38,
                            color: '#C00707',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        BLOOD
                    </span>
                    <span
                        ref={plusRef}
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            fontWeight: 800, fontSize: 38,
                            color: '#FFB33F',
                        }}
                    >
                        +
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                width: 160, height: 3,
                backgroundColor: 'rgba(255,255,255,0.07)',
                borderRadius: 99, overflow: 'hidden',
            }}>
                <div
                    ref={barRef}
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #C00707 0%, #FF4400 50%, #FFB33F 100%)',
                        borderRadius: 99,
                    }}
                />
            </div>

            <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12, color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
                Save Lives · Donate Blood
            </div>
        </div>
    );
};

export default PageLoader;