import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RouteTransition from "../components/RouteTransition/RouteTransition";

/**
 * RootLayout - wraps all public routes.
 * Includes:
 *   - Lenis smooth scroll (npm install lenis)
 *   - RouteTransition GSAP fade-in on page changes
 */
const RootLayout = () => {
    const lenisRef = useRef(null);
    const rafRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const init = async () => {
            try {
                const { default: Lenis } = await import("lenis");
                const lenis = new Lenis({
                    duration: 1.15,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: "vertical",
                    smoothWheel: true,
                    touchMultiplier: 1.5,
                });
                lenisRef.current = lenis;
                const tick = (time) => {
                    lenis.raf(time);
                    rafRef.current = requestAnimationFrame(tick);
                };
                rafRef.current = requestAnimationFrame(tick);
            } catch { /* lenis not installed - ok */ }
        };
        init();
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (lenisRef.current) lenisRef.current.destroy();
        };
    }, []);

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [location.pathname]);

    return (
        <div>
            <Navbar />
            <RouteTransition>
                <Outlet />
            </RouteTransition>
            <Footer />
        </div>
    );
};

export default RootLayout;