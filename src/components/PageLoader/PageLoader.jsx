import { useEffect, useRef, useState } from 'react';

/**
 * PageLoader — a slim top-of-page loading bar shown on first app load.
 * Does NOT hide page content — it sits above the page as a non-intrusive banner.
 *
 * Uses GSAP for animation (npm install gsap).
 * Falls back to CSS if GSAP is not installed.
 */
const PageLoader = ({ onComplete }) => {
    const barRef       = useRef(null);
    const containerRef = useRef(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const run = async () => {
            let gsap;
            try {
                const mod = await import('gsap');
                gsap = mod.gsap || mod.default;
            } catch {
                // CSS fallback
                if (barRef.current) {
                    barRef.current.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
                    barRef.current.style.width = '100%';
                }
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.style.transition = 'opacity 0.3s ease';
                        containerRef.current.style.opacity = '0';
                    }
                    setTimeout(() => { setVisible(false); onComplete?.(); }, 320);
                }, 1300);
                return;
            }

            if (!barRef.current) return;

            gsap.set(barRef.current, { width: '0%' });

            gsap.timeline()
                // Bar sweeps to 85% quickly, then pauses waiting for app
                .to(barRef.current, {
                    width: '85%',
                    duration: 0.9,
                    ease: 'power2.out',
                })
                // Finish to 100%
                .to(barRef.current, {
                    width: '100%',
                    duration: 0.35,
                    ease: 'power1.inOut',
                })
                // Fade out container
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 0.28,
                    ease: 'power1.inOut',
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
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 9999,
                height: 3,
                backgroundColor: 'transparent',
                pointerEvents: 'none',
            }}
        >
            <div
                ref={barRef}
                style={{
                    height: '100%',
                    width: '0%',
                    background: 'linear-gradient(90deg, #C00707 0%, #FF4400 60%, #FFB33F 100%)',
                    borderRadius: '0 2px 2px 0',
                    boxShadow: '0 0 8px rgba(192,7,7,0.6)',
                }}
            />
        </div>
    );
};

export default PageLoader;