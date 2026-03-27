import { useRef, useEffect } from "react";
import { useLocation } from "react-router";

/**
 * RouteTransition — animates page content on every route change.
 * Uses GSAP (npm install gsap) for a smooth fade + upward drift.
 * Falls back to CSS transitions if GSAP is not installed.
 */
const RouteTransition = ({ children }) => {
    const location = useLocation();
    return (
        <AnimatedPage key={location.pathname}>
            {children}
        </AnimatedPage>
    );
};

const AnimatedPage = ({ children }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        const run = async () => {
            try {
                const mod = await import("gsap");
                const gsap = mod.gsap || mod.default;
                // Fade + lift from below — snappy, not sluggish
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 16, scale: 0.995 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: "power3.out" }
                );
            } catch {
                // CSS fallback
                el.style.opacity = "0";
                el.style.transform = "translateY(14px)";
                el.style.transition = "opacity 0.32s ease, transform 0.32s ease";
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    if (el) {
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                    }
                }));
            }
        };

        run();
    }, []);

    return (
        <div ref={ref} style={{ willChange: "opacity, transform" }}>
            {children}
        </div>
    );
};

export default RouteTransition;