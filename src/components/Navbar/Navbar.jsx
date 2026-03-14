// src/components/Navbar/Navbar.jsx
import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';
import auth from '../../firebase/firebase.config';           // ✅ fixed: lowercase 'firebase'
import { AuthContext } from '../../Provider/AuthProvider';
import { useTheme } from '../../context/ThemeContext';

// ── Icons (no extra package needed) ─────────────────────────────
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
  </svg>
);
const ChevronDown = ({ open }) => (
  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// ── Active nav link with animated underline ──────────────────────
function NavLink({ to, children }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`
        relative text-sm font-semibold py-1 transition-colors duration-150
        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full
        after:transition-all after:duration-200
        ${active
          ? 'text-[#C00707] after:w-full after:bg-[#C00707]'
          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] after:w-0 hover:after:w-full after:bg-[#C00707]'
        }
      `}
    >
      {children}
    </Link>
  );
}

// ── User avatar ──────────────────────────────────────────────────
function Avatar({ user }) {
  if (user?.photoURL) {
    return (
      <img src={user.photoURL} alt={user.displayName || 'User'}
        className="w-8 h-8 rounded-full object-cover border-2 border-[#C00707]" />
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-[#C00707] text-white flex items-center
                    justify-center text-sm font-bold border-2 border-[#C00707]">
      {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
    </div>
  );
}

// ── Main Navbar ──────────────────────────────────────────────────
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const logout = () => {
    signOut(auth);
    navigate('/login');
  };

  // Logged-out: 4 routes
  const publicLinks = [
    { to: '/',             label: 'Home' },
    { to: '/all-requests', label: 'Blood Requests' },
    { to: '/search',       label: 'Find Donors' },
    { to: '/donate',       label: 'Donate' },
    { to: '/about',        label: 'About' },
    { to: '/contact',      label: 'Contact' },
  ];

  // Logged-in: 6 routes (Dashboard lives in the profile dropdown)
  const privateLinks = [
    { to: '/',             label: 'Home' },
    { to: '/all-requests', label: 'Blood Requests' },
    { to: '/search',       label: 'Find Donors' },
    { to: '/donate',       label: 'Donate' },
    { to: '/blog',         label: 'Blog' },
    { to: '/about',        label: 'About' },
    { to: '/contact',      label: 'Contact' },
  ];

  const navLinks = user ? privateLinks : publicLinks;

  // Profile dropdown items
  const profileMenu = [
    { label: '🏠 Dashboard',     path: '/dashboard' },
    { label: '👤 My Profile',   path: '/dashboard/profile' },
    { label: '🩸 My Requests',  path: '/dashboard/my-request' },
    { divider: true },
    { label: '🚪 Logout',       danger: true, onClick: logout },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🩸</span>
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span style={{ color: '#C00707' }}>BLOOD</span>
              <span style={{ color: dark ? '#FFB33F' : '#134E8E' }}>LINK</span>
            </span>
          </Link>

          {/* ── Desktop links ─────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
            ))}
          </div>

          {/* ── Right side controls ───────────────────────────── */}
          <div className="flex items-center gap-2">

            {/* Dark/Light toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-xl flex items-center justify-center
                         cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-muted)',
                border: '1px solid var(--border)',
                color: dark ? '#FFB33F' : 'var(--text-muted)',
              }}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Auth */}
            {user ? (
              /* Profile dropdown — desktop only */
              <div className="relative hidden lg:block" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(o => !o)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl cursor-pointer
                             transition-colors duration-150"
                  style={{
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Avatar user={user} />
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-semibold leading-none font-['Sora']"
                       style={{ color: 'var(--text-primary)' }}>
                      {user.displayName?.split(' ')[0] || 'User'}
                    </p>
                    <p className="text-[10px] leading-none mt-0.5"
                       style={{ color: 'var(--text-faint)' }}>
                      {user.email?.slice(0, 22)}
                    </p>
                  </div>
                  <ChevronDown open={profileOpen} />
                </button>

                {/* Dropdown panel */}
                {profileOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-52 z-50 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    {/* User info header */}
                    <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-subtle)' }}>
                      <p className="text-sm font-semibold font-['Sora'] truncate" style={{ color: 'var(--text-primary)' }}>
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-faint)' }}>{user.email}</p>
                    </div>

                    {/* Menu items */}
                    {profileMenu.map((item, i) => {
                      if (item.divider) return (
                        <div key={i} style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />
                      );
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            item.onClick ? item.onClick() : navigate(item.path);
                            setProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer"
                          style={{ color: item.danger ? '#C00707' : 'var(--text-primary)' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = item.danger ? 'rgba(192,7,7,0.06)' : 'var(--bg-subtle)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Login / Register — desktop */
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login"
                  className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Login
                </Link>
                <Link to="/signup"
                  className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all"
                  style={{ backgroundColor: '#C00707' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#A00606'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C00707'}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-muted)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────── */}
      {mobileOpen && (
        <div style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-base)' }}>
          <div className="px-4 py-3 flex flex-col gap-1 max-w-7xl mx-auto">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
                  ${pathname === link.to ? 'text-[#C00707]' : ''}`}
                style={{
                  color: pathname === link.to ? '#C00707' : 'var(--text-muted)',
                  backgroundColor: pathname === link.to ? 'rgba(192,7,7,0.06)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 mb-1">
                    <Avatar user={user} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{user.email}</p>
                    </div>
                  </div>
                  <Link to="/dashboard/profile"
                    className="block px-3 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ color: 'var(--text-muted)' }}>
                    👤 My Profile
                  </Link>
                  <Link to="/dashboard/my-request"
                    className="block px-3 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ color: 'var(--text-muted)' }}>
                    🩸 My Requests
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                    style={{ color: '#C00707' }}
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login"
                    className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                    Login
                  </Link>
                  <Link to="/signup"
                    className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ backgroundColor: '#C00707' }}>
                    Register Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;