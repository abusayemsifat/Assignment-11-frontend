import { useRef, useEffect } from "react";
import { useLocation } from "react-router";

/**
 * RouteTransition - animates page content on every route change.
 * Uses GSAP (npm install gsap) for fade + upward drift.
 * Falls back to CSS transitions if GSAP is not installed.
 *
 * Usage: wrap <Outlet /> with this component.
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
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                );
            } catch {
                el.style.opacity = "0";
                el.style.transform = "translateY(10px)";
                el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    if (el) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }
                }));
            }
        };
        run();
    }, []);

    return <div ref={ref}>{children}</div>;
};

export default RouteTransition;