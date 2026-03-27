// src/components/Navbar/Navbar.jsx
import { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { AuthContext } from '../../Provider/AuthProvider';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

// Public links (logged out)
const publicLinks = [
  { to: '/',             label: 'Home' },
  { to: '/all-requests', label: 'Blood Requests' },
  { to: '/search',       label: 'Find Donors' },
  { to: '/donate',       label: 'Donate' },
  { to: '/blog',         label: 'Blog' },
  { to: '/about',        label: 'About' },
  { to: '/contact',      label: 'Contact' },
];

// Logged in links
const loggedInLinks = [
  { to: '/',             label: 'Home' },
  { to: '/all-requests', label: 'Blood Requests' },
  { to: '/search',       label: 'Find Donors' },
  { to: '/donate',       label: 'Donate' },
  { to: '/dashboard',    label: 'Dashboard' },
  { to: '/blog',         label: 'Blog' },
  { to: '/about',        label: 'About' },
  { to: '/contact',      label: 'Contact' },
];

const getInitials = (name) => {
  if (!name) return 'U';
  return name.charAt(0).toUpperCase();
};

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  const links = user ? loggedInLinks : publicLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Logged out successfully');
    navigate('/login');
    setDropOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-base-100/90 backdrop-blur-xl shadow-lg border-b border-base-200'
          : 'bg-base-100/70 backdrop-blur-md'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--bg-base)' : 'var(--bg-base)',
        borderBottom: `1px solid var(--border)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 bg-gradient-to-br from-[#C00707] to-[#FF4400] rounded-xl flex items-center justify-center shadow-lg shadow-[#C00707]/30"
          >
            <span className="text-white text-sm">🩸</span>
          </motion.div>
          <span className="font-extrabold text-xl">
            <span style={{ color: '#C00707' }}>BLOOD</span>
            <span style={{ color: '#134E8E' }}>LINK</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative text-sm font-semibold transition-colors duration-200 hover:text-[#C00707] ${
                  isActive ? 'text-[#C00707]' : 'text-[var(--text-muted)]'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C00707] to-[#FF4400] rounded-full"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--bg-muted)] transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={dark ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-base"
              >
                {dark ? '☀️' : '🌙'}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {user ? (
            <div className="relative" ref={dropRef}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setDropOpen(d => !d)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-[var(--bg-muted)] transition-colors"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-[#C00707]/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C00707] to-[#FF4400] text-white text-xs font-bold flex items-center justify-center shadow-md shadow-[#C00707]/30">
                    {getInitials(user.displayName || user.email)}
                  </div>
                )}
                <span className="hidden md:block text-sm font-semibold max-w-[100px] truncate" style={{ color: 'var(--text-primary)' }}>
                  {user.displayName || 'User'}
                </span>
                <motion.span
                  animate={{ rotate: dropOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs"
                  style={{ color: 'var(--text-faint)' }}
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-56 rounded-2xl shadow-2xl py-2 z-50"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="px-4 py-3 border-b" style={{ borderBottomColor: 'var(--border)' }}>
                      <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-faint)' }}>
                        {user.email}
                      </p>
                    </div>
                    {[
                      { to: '/dashboard',         icon: '📊', label: 'Dashboard' },
                      { to: '/dashboard/profile', icon: '👤', label: 'My Profile' },
                      { to: '/dashboard/my-request', icon: '🩸', label: 'My Requests' },
                    ].map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--bg-muted)] transition-colors font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t mt-1 pt-1" style={{ borderTopColor: 'var(--border)' }}>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 w-full transition-colors font-medium"
                      >
                        <span>🚪</span> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-semibold rounded-xl transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-sm px-5 py-2 rounded-xl text-white"
                  style={{ backgroundColor: '#C00707' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#A00606'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C00707'}
                >
                  Sign Up Free
                </motion.button>
              </Link>
            </div>
          )}

          {/* Hamburger - Mobile */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(o => !o)}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--bg-muted)] transition-colors lg:hidden"
            style={{ color: 'var(--text-muted)' }}
          >
            <div className="flex flex-col gap-1.5 w-5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t overflow-hidden"
            style={{ borderTopColor: 'var(--border)', backgroundColor: 'var(--bg-base)' }}
          >
            <div className="p-4 space-y-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-[rgba(192,7,7,0.1)] text-[#C00707]'
                          : 'hover:bg-[var(--bg-muted)] text-[var(--text-muted)]'
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}

              {!user && (
                <div className="flex gap-2 pt-2 mt-2 border-t" style={{ borderTopColor: 'var(--border)' }}>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                    <button
                      className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors"
                      style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1">
                    <button
                      className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white"
                      style={{ backgroundColor: '#C00707' }}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;