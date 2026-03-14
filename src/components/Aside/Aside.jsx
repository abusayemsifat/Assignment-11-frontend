import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../Firebase/firebase.config";

const FONT_DISPLAY = "Inter, system-ui, -apple-system, sans-serif";
const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";

const Icon = ({ path, size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
    </svg>
);

const ICONS = {
    home:      "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    request:   "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2",
    addReq:    "M12 5v14 M5 12h14",
    users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    profile:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    settings:  "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    chart:     "M18 20V10 M12 20V4 M6 20v-6",
    blog:      "M4 6h16 M4 10h16 M4 14h10 M4 18h6",
    manageReq: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
    logout:    "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
    close:     "M18 6 6 18 M6 6l12 12",
    website:   "M19 12H5 M12 19l-7-7 7-7",
};

/* Pure CSS for nav links — avoids the onMouseEnter inline-style permanence bug */
const NAV_CSS = `
    .aside-link {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 10px 14px;
        border-radius: 12px;
        text-decoration: none;
        font-size: 14px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 500;
        color: var(--text-muted, #9ca3af);
        background-color: transparent;
        transition: background-color 0.18s ease, color 0.18s ease, transform 0.15s ease;
    }
    .aside-link:hover {
        background-color: rgba(192,7,7,0.1);
        color: #C00707;
        transform: translateX(3px);
    }
    .aside-link[aria-current="page"] {
        background-color: #C00707 !important;
        color: #ffffff !important;
        transform: none !important;
    }
    .aside-link[aria-current="page"]:hover {
        background-color: #a80505 !important;
        color: #ffffff !important;
    }
    .aside-home-link {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 9px 14px;
        border-radius: 12px;
        text-decoration: none;
        font-size: 13px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 500;
        color: var(--text-faint, #6b7280);
        background-color: transparent;
        border: 1px solid var(--border, rgba(255,255,255,0.08));
        transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
    }
    .aside-home-link:hover {
        background-color: rgba(255,255,255,0.05);
        color: var(--text-muted, #9ca3af);
        border-color: rgba(255,255,255,0.18);
    }
    .aside-logout {
        display: flex;
        align-items: center;
        gap: 11px;
        width: 100%;
        padding: 10px 14px;
        border-radius: 12px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: #f87171;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        transition: background-color 0.18s ease, transform 0.15s ease;
        text-align: left;
    }
    .aside-logout:hover {
        background-color: rgba(248,113,113,0.12);
        transform: translateX(3px);
    }
`;

const SectionLabel = ({ label }) => (
    <div style={{
        fontSize: 10, fontFamily: FONT_DISPLAY, fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: "var(--text-faint, #6b7280)",
        padding: "4px 14px", margin: "10px 0 3px",
    }}>
        {label}
    </div>
);

const NavItem = ({ to, end, icon, label, onClick }) => (
    <NavLink to={to} end={end} onClick={onClick} className="aside-link">
        <span style={{ flexShrink: 0, opacity: 0.85 }}>
            <Icon path={icon} size={17} />
        </span>
        {label}
    </NavLink>
);

/* Animates nav items in on mount using GSAP if available */
const AnimatedNav = ({ children }) => {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const items = el.querySelectorAll('.aside-link, .aside-section-label');
        const run = async () => {
            try {
                const mod = await import('gsap');
                const gsap = mod.gsap || mod.default;
                gsap.fromTo(items,
                    { opacity: 0, x: -14 },
                    { opacity: 1, x: 0, duration: 0.35, stagger: 0.045, ease: 'power2.out', delay: 0.1 }
                );
            } catch {
                // no gsap - items just appear
            }
        };
        run();
    }, []);
    return <nav ref={ref} style={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>{children}</nav>;
};

const Aside = ({ onClose }) => {
    const { role } = useContext(AuthContext);
    const navigate = useNavigate();
    const footerRef = useRef(null);

    const handleLogout = () => signOut(auth).then(() => navigate("/"));
    const close = onClose || (() => {});

    // Animate footer buttons in
    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const run = async () => {
            try {
                const mod = await import('gsap');
                const gsap = mod.gsap || mod.default;
                gsap.fromTo(el.children,
                    { opacity: 0, y: 8 },
                    { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out', delay: 0.4 }
                );
            } catch {}
        };
        run();
    }, []);

    return (
        <>
            <style>{NAV_CSS}</style>
            <aside style={{
                width: 260, height: "100%", minHeight: "100vh",
                backgroundColor: "var(--sidebar-bg, #0d0d0d)",
                borderRight: "1px solid var(--border, rgba(255,255,255,0.08))",
                display: "flex", flexDirection: "column",
                padding: "0 12px", boxSizing: "border-box",
                overflowY: "auto",
            }}>

                {/* ── Logo ── */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "22px 6px 18px",
                    borderBottom: "1px solid var(--border, rgba(255,255,255,0.08))",
                    marginBottom: 6,
                }}>
                    <div style={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 800, fontSize: 19,
                        display: "flex", alignItems: "center", gap: 8,
                    }}>
                        <span style={{ fontSize: 22 }}>🩸</span>
                        <span>
                            <span style={{ color: "#C00707" }}>BLOOD</span>
                            <span style={{ color: "var(--brand-navy, #134E8E)" }}>LINK</span>
                        </span>
                    </div>
                    {onClose && (
                        <button onClick={onClose} style={{
                            width: 32, height: 32, border: "none", borderRadius: 8,
                            backgroundColor: "rgba(255,255,255,0.07)", cursor: "pointer",
                            color: "var(--text-muted, #9ca3af)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "background-color 0.15s",
                        }}>
                            <Icon path={ICONS.close} size={15} />
                        </button>
                    )}
                </div>

                {/* ── Navigation (GSAP stagger animated) ── */}
                <AnimatedNav>
                    <SectionLabel label="Overview" />
                    <NavItem to="/dashboard" end icon={ICONS.home} label="Dashboard" onClick={close} />

                    {role === "donor" && (
                        <>
                            <SectionLabel label="My Activity" />
                            <NavItem to="/dashboard/my-request"  icon={ICONS.request} label="My Requests"  onClick={close} />
                            <NavItem to="/dashboard/add-request" icon={ICONS.addReq}  label="Add Request"  onClick={close} />
                        </>
                    )}

                    {role === "admin" && (
                        <>
                            <SectionLabel label="Management" />
                            <NavItem to="/dashboard/all-users"       icon={ICONS.users}     label="All Users"       onClick={close} />
                            <NavItem to="/dashboard/manage-requests" icon={ICONS.manageReq} label="Manage Requests" onClick={close} />
                            <NavItem to="/dashboard/reports"         icon={ICONS.chart}     label="Reports"         onClick={close} />
                            <NavItem to="/dashboard/blog"            icon={ICONS.blog}      label="Blog"            onClick={close} />
                        </>
                    )}

                    <SectionLabel label="Account" />
                    <NavItem to="/dashboard/profile"  icon={ICONS.profile}  label="Profile"  onClick={close} />
                    <NavItem to="/dashboard/settings" icon={ICONS.settings} label="Settings" onClick={close} />
                </AnimatedNav>

                {/* ── Footer: Home + Logout ── */}
                <div ref={footerRef} style={{
                    padding: "12px 0 20px",
                    borderTop: "1px solid var(--border, rgba(255,255,255,0.08))",
                    marginTop: 8,
                    display: "flex", flexDirection: "column", gap: 4,
                }}>
                    <Link to="/" className="aside-home-link">
                        <Icon path={ICONS.website} size={15} />
                        Back to Website
                    </Link>
                    <button onClick={handleLogout} className="aside-logout">
                        <Icon path={ICONS.logout} size={17} />
                        Logout
                    </button>
                </div>

            </aside>
        </>
    );
};

export default Aside;