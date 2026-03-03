import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../Firebase/firebase.config";

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

// Icons as inline SVGs for zero dependency
const Icon = ({ path, size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
    </svg>
);

const ICONS = {
    home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    request: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 M12 12h.01 M12 16h.01 M8 12h.01 M8 16h.01 M16 12h.01 M16 16h.01",
    addRequest: "M12 5v14 M5 12h14",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    profile: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    chart: "M18 20V10 M12 20V4 M6 20v-6",
    blog: "M4 6h16 M4 10h16 M4 14h10 M4 18h6",
    manageReq: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
    logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
    close: "M18 6 6 18 M6 6l12 12",
};

const NavItem = ({ to, end, icon, label, onClick }) => (
    <NavLink
        to={to}
        end={end}
        onClick={onClick}
        style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 11,
            padding: '10px 14px', borderRadius: 12,
            textDecoration: 'none', fontSize: 14,
            fontFamily: FONT_BODY, fontWeight: 500,
            transition: 'all 0.18s ease',
            backgroundColor: isActive ? '#C00707' : 'transparent',
            color: isActive ? '#fff' : 'var(--text-muted, #9ca3af)',
        })}
        onMouseEnter={(e) => {
            if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.style.backgroundColor = 'rgba(192,7,7,0.12)';
                e.currentTarget.style.color = '#C00707';
            }
        }}
        onMouseLeave={(e) => {
            // Let NavLink handle the active state reset via inline style
            // We just reset non-active ones
        }}
    >
        <span style={{ opacity: 0.9, flexShrink: 0 }}>
            <Icon path={icon} size={17} />
        </span>
        {label}
    </NavLink>
);

// Section label
const SectionLabel = ({ children }) => (
    <div style={{
        fontSize: 10, fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--text-faint, #6b7280)',
        padding: '4px 14px', margin: '8px 0 4px',
    }}>
        {children}
    </div>
);

const Aside = ({ onClose }) => {
    const { role } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => navigate('/'));
    };

    const close = onClose || (() => {});

    return (
        <aside style={{
            width: 260, height: '100%', minHeight: '100vh',
            backgroundColor: 'var(--sidebar-bg, #0d0d0d)',
            borderRight: '1px solid var(--border, rgba(255,255,255,0.07))',
            display: 'flex', flexDirection: 'column',
            padding: '0 12px', boxSizing: 'border-box',
            overflowY: 'auto',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '22px 6px 18px',
                borderBottom: '1px solid var(--border, rgba(255,255,255,0.07))',
                marginBottom: 8,
            }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 18 }}>
                    <span style={{
                        background: 'linear-gradient(135deg,#C00707,#FF4400)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        🩸 BloodLink
                    </span>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        style={{
                            width: 32, height: 32, border: 'none', borderRadius: 8,
                            backgroundColor: 'rgba(255,255,255,0.08)', cursor: 'pointer',
                            color: 'var(--text-muted, #9ca3af)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        <Icon path={ICONS.close} size={15} />
                    </button>
                )}
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                <SectionLabel>Overview</SectionLabel>
                <NavItem to="/dashboard" end icon={ICONS.home} label="Dashboard" onClick={close} />

                {/* Donor links */}
                {role === 'donor' && (
                    <>
                        <SectionLabel>My Activity</SectionLabel>
                        <NavItem to="/dashboard/my-request" icon={ICONS.request} label="My Requests" onClick={close} />
                        <NavItem to="/dashboard/add-request" icon={ICONS.addRequest} label="Add Request" onClick={close} />
                    </>
                )}

                {/* Admin links */}
                {role === 'admin' && (
                    <>
                        <SectionLabel>Management</SectionLabel>
                        <NavItem to="/dashboard/all-users" icon={ICONS.users} label="All Users" onClick={close} />
                        <NavItem to="/dashboard/manage-requests" icon={ICONS.manageReq} label="Manage Requests" onClick={close} />
                        <NavItem to="/dashboard/reports" icon={ICONS.chart} label="Reports" onClick={close} />
                        <NavItem to="/dashboard/blog" icon={ICONS.blog} label="Blog" onClick={close} />
                    </>
                )}

                <SectionLabel>Account</SectionLabel>
                <NavItem to="/dashboard/profile" icon={ICONS.profile} label="Profile" onClick={close} />
                <NavItem to="/dashboard/settings" icon={ICONS.settings} label="Settings" onClick={close} />
            </nav>

            {/* Logout */}
            <div style={{
                padding: '12px 0 20px',
                borderTop: '1px solid var(--border, rgba(255,255,255,0.07))',
                marginTop: 8,
            }}>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 11,
                        width: '100%', padding: '10px 14px', borderRadius: 12,
                        border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
                        color: '#f87171', fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500,
                        transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.12)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <Icon path={ICONS.logout} size={17} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Aside;