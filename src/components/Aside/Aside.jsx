import { NavLink, useNavigate } from "react-router-dom";
import { HomeIcon, UserCircleIcon, ClipboardDocumentListIcon, PlusCircleIcon, UsersIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, ChartBarIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const Aside = () => {
  const { role, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => signOut(auth).then(() => navigate('/login'));

  const donorLinks = [
    { to:'/dashboard',            label:'Overview',        Icon:HomeIcon },
    { to:'/dashboard/my-request', label:'My Requests',     Icon:ClipboardDocumentListIcon },
    { to:'/dashboard/add-request',label:'Add Request',     Icon:PlusCircleIcon },
    { to:'/dashboard/profile',    label:'Profile',         Icon:UserCircleIcon },
    { to:'/dashboard/settings',   label:'Settings',        Icon:Cog6ToothIcon },
  ];
  const adminLinks = [
    { to:'/dashboard',                 label:'Overview',        Icon:HomeIcon },
    { to:'/dashboard/all-users',       label:'Manage Users',    Icon:UsersIcon },
    { to:'/dashboard/manage-requests', label:'Manage Requests', Icon:ClipboardDocumentListIcon },
    { to:'/dashboard/reports',         label:'Reports',         Icon:ChartBarIcon },
    { to:'/dashboard/blog',            label:'Blog',            Icon:NewspaperIcon },
    { to:'/dashboard/profile',         label:'Profile',         Icon:UserCircleIcon },
    { to:'/dashboard/settings',        label:'Settings',        Icon:Cog6ToothIcon },
  ];
  const links = role === 'admin' ? adminLinks : donorLinks;

  return (
    <aside style={{ width:240, minHeight:'100vh', backgroundColor:'#0F0F0F', display:'flex', flexDirection:'column', padding:20, flexShrink:0 }}>
      <NavLink to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:8, marginBottom:28 }}>
        <span style={{ fontSize:18 }}>🩸</span>
        <span style={{ fontFamily:FD, fontWeight:800, fontSize:18 }}>
          <span style={{ color:'#C00707' }}>BLOOD</span><span style={{ color:'#FFB33F' }}>+</span>
        </span>
      </NavLink>

      {user && (
        <div style={{ padding:'10px 12px', borderRadius:12, backgroundColor:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', marginBottom:20 }}>
          <p style={{ fontFamily:FD, fontWeight:700, fontSize:13, color:'#E5E5E5', margin:'0 0 4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.displayName || 'User'}</p>
          <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:99, fontSize:10, fontWeight:700, textTransform:'uppercase', fontFamily:FD, backgroundColor: role==='admin'?'rgba(19,78,142,0.4)':'rgba(192,7,7,0.3)', color: role==='admin'?'#90caff':'#ffaaaa' }}>
            {role || 'donor'}
          </span>
        </div>
      )}

      <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:1.5, fontWeight:700, color:'#444', fontFamily:FD, margin:'0 0 8px 4px' }}>Menu</p>

      <nav style={{ display:'flex', flexDirection:'column', gap:2, flex:1 }}>
        {links.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} end={to==='/dashboard'}
            style={({ isActive }) => ({
              display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
              borderRadius:10, textDecoration:'none', fontSize:13,
              fontWeight: isActive ? 700 : 500,
              fontFamily: isActive ? FD : FB,
              color: isActive ? '#fff' : '#888',
              backgroundColor: isActive ? '#C00707' : 'transparent',
              transition:'all 0.15s',
            })}>
            <Icon style={{ width:16, height:16, flexShrink:0 }} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:14, marginTop:8 }}>
        <button onClick={handleLogout}
          style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', width:'100%', borderRadius:10, border:'none', backgroundColor:'transparent', color:'#ff7777', fontSize:13, fontFamily:FB, cursor:'pointer', transition:'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor='rgba(192,7,7,0.2)'; e.currentTarget.style.color='#ffaaaa'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='#ff7777'; }}>
          <ArrowRightOnRectangleIcon style={{ width:16, height:16, flexShrink:0 }} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Aside;