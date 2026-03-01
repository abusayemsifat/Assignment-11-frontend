import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config"; 

const Aside = () => {
  const { role, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };

  // Active link style
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
     transition-all duration-150 cursor-pointer
     ${isActive
       ? 'text-white'
       : 'hover:text-white'
     }`;

  const activeStyle = {
    backgroundColor: '#C00707',
    color: '#fff',
  };

  const inactiveHover = {
    backgroundColor: 'rgba(255,255,255,0.07)',
  };

  // Donor menu 
  const donorLinks = [
    { to: '/dashboard',            label: 'Overview',     icon: HomeIcon },
    { to: '/dashboard/my-request', label: 'My Requests',  icon: ClipboardDocumentListIcon },
    { to: '/dashboard/add-request',label: 'Add Request',  icon: PlusCircleIcon },
    { to: '/dashboard/profile',    label: 'Profile',      icon: UserCircleIcon },
    { to: '/dashboard/settings',   label: 'Settings',     icon: Cog6ToothIcon },
  ];

  // Admin menu 
  const adminLinks = [
    { to: '/dashboard',              label: 'Overview',       icon: HomeIcon },
    { to: '/dashboard/all-users',    label: 'Manage Users',   icon: UsersIcon },
    { to: '/dashboard/manage-items', label: 'Manage Requests',icon: ClipboardDocumentListIcon },
    { to: '/dashboard/reports',      label: 'Reports',        icon: ChartBarIcon },
    { to: '/dashboard/blog',         label: 'Blog',           icon: NewspaperIcon },
    { to: '/dashboard/profile',      label: 'Profile',        icon: UserCircleIcon },
    { to: '/dashboard/settings',     label: 'Settings',       icon: Cog6ToothIcon },
  ];

  const links = role === 'admin' ? adminLinks : donorLinks;

  return (
    <aside
      className="w-64 min-h-screen flex flex-col p-5 shrink-0"
      style={{ backgroundColor: '#0F0F0F', color: '#E5E5E5' }}
    >
      {/* Logo */}
      <div className="mb-8">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-lg">🩸</span>
          <span className="font-['Sora'] font-bold text-lg">
            <span style={{ color: '#C00707' }}>BLOOD</span>
            <span style={{ color: '#FFB33F' }}>+</span>
          </span>
        </NavLink>
        {user && (
          <div className="mt-4 px-1">
            <p className="text-xs font-semibold truncate" style={{ color: '#A0A0A0' }}>
              {user.displayName || 'User'}
            </p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
              style={{ backgroundColor: role === 'admin' ? '#134E8E' : 'rgba(192,7,7,0.3)', color: role === 'admin' ? '#90caff' : '#ff9999' }}>
              {role || 'donor'}
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-2 px-1"
           style={{ color: '#555' }}>
          Menu
        </p>

        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
               transition-all duration-150 cursor-pointer
               ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`
            }
            style={({ isActive }) => isActive ? { backgroundColor: '#C00707' } : {}}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-6 pt-4" style={{ borderTop: '1px solid #2E2E2E' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm
                     font-medium cursor-pointer transition-all duration-150
                     text-red-400 hover:text-white hover:bg-red-700"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Aside;