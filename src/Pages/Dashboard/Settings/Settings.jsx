import { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { signOut, deleteUser } from 'firebase/auth';
import auth from '../../../firebase/firebase.config';
import { useNavigate } from 'react-router';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";

const sectionStyle = {
  backgroundColor:'var(--bg-base)', border:'1px solid var(--border)',
  borderRadius:16, padding:24, marginBottom:20,
  boxShadow:'var(--shadow-sm)',
};
const headingStyle = {
  fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:16,
  color:'var(--text-primary)', margin:'0 0 4px',
};
const subStyle = {
  fontSize:12, color:'var(--text-muted)', margin:'0 0 20px', fontFamily:FONT_BODY,
};
const labelStyle = {
  display:'flex', justifyContent:'space-between', alignItems:'center',
  padding:'12px 0', borderBottom:'1px solid var(--border)',
};
const toggleStyle = (on) => ({
  width:44, height:24, borderRadius:12,
  backgroundColor: on ? '#C00707' : 'var(--bg-muted)',
  position:'relative', cursor:'pointer', transition:'background 0.2s', border:'none', flexShrink:0,
});
const dotStyle = (on) => ({
  position:'absolute', top:3, left: on ? 23 : 3,
  width:18, height:18, borderRadius:'50%', backgroundColor:'#fff',
  transition:'left 0.2s', boxShadow:'0 1px 4px rgba(0,0,0,0.2)',
});

const Settings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [notifs, setNotifs] = useState({
    urgentRequests:    true,
    donationReminders: true,
    newsletters:       false,
    accountActivity:   true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile:    true,
    showBloodGroup: true,
    showLocation:   false,
  });

  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  const handleDeleteAccount = () => {
    if (auth.currentUser) {
      deleteUser(auth.currentUser)
        .then(() => navigate('/'))
        .catch(err => {
          console.log(err);
          alert('Please re-login and try again. Firebase requires recent authentication to delete accounts.');
        });
    }
  };

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} style={toggleStyle(value)} type="button" aria-checked={value}>
      <span style={dotStyle(value)} />
    </button>
  );

  const SettingRow = ({ label, desc, value, onChange }) => (
    <div style={labelStyle}>
      <div style={{ flex:1, marginRight:16 }}>
        <p style={{ fontFamily:FONT_DISPLAY, fontWeight:600, fontSize:13, color:'var(--text-primary)', margin:'0 0 2px' }}>{label}</p>
        {desc && <p style={{ fontSize:11, color:'var(--text-faint)', margin:0, fontFamily:FONT_BODY }}>{desc}</p>}
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );

  return (
    <div style={{ fontFamily:FONT_BODY, maxWidth:640 }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:22, color:'var(--text-primary)', margin:'0 0 4px' }}>Settings</h1>
        <p style={{ fontSize:13, color:'var(--text-muted)', margin:0, fontFamily:FONT_BODY }}>Manage your account preferences</p>
      </div>

      {/* Account Info */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Account</h2>
        <p style={subStyle}>Your current account details</p>
        <div style={{ display:'flex', gap:14, alignItems:'center', padding:'12px 16px', borderRadius:12, backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)' }}>
          {user?.photoURL
            ? <img src={user.photoURL} alt="" style={{ width:48, height:48, borderRadius:'50%', objectFit:'cover', border:'2px solid #C00707' }} />
            : <div style={{ width:48, height:48, borderRadius:'50%', backgroundColor:'#C00707', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:18, flexShrink:0 }}>{(user?.displayName||'U')[0].toUpperCase()}</div>
          }
          <div>
            <p style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 2px' }}>{user?.displayName || 'User'}</p>
            <p style={{ fontSize:12, color:'var(--text-muted)', margin:0, fontFamily:FONT_BODY }}>{user?.email}</p>
          </div>
          <button onClick={() => navigate('/dashboard/profile')}
            style={{ marginLeft:'auto', padding:'8px 16px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-base)', color:'var(--text-muted)', fontSize:12, fontFamily:FONT_DISPLAY, fontWeight:600, cursor:'pointer', flexShrink:0, transition:'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#C00707'; e.currentTarget.style.color='#C00707'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)'; }}
          >Edit Profile</button>
        </div>
      </div>

      {/* Notification settings */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Notifications</h2>
        <p style={subStyle}>Choose what you want to be notified about</p>
        <SettingRow label="Urgent Blood Requests"   desc="Get notified when urgent requests match your blood group" value={notifs.urgentRequests}    onChange={v => setNotifs(n=>({...n,urgentRequests:v}))} />
        <SettingRow label="Donation Reminders"       desc="Remind me when I'm eligible to donate again"           value={notifs.donationReminders}  onChange={v => setNotifs(n=>({...n,donationReminders:v}))} />
        <SettingRow label="Account Activity"         desc="Login alerts and security notifications"               value={notifs.accountActivity}   onChange={v => setNotifs(n=>({...n,accountActivity:v}))} />
        <div style={{ ...labelStyle, borderBottom:'none' }}>
          <div style={{ flex:1, marginRight:16 }}>
            <p style={{ fontFamily:FONT_DISPLAY, fontWeight:600, fontSize:13, color:'var(--text-primary)', margin:'0 0 2px' }}>Newsletter</p>
            <p style={{ fontSize:11, color:'var(--text-faint)', margin:0, fontFamily:FONT_BODY }}>Monthly updates and blood donation news</p>
          </div>
          <Toggle value={notifs.newsletters} onChange={v => setNotifs(n=>({...n,newsletters:v}))} />
        </div>
      </div>

      {/* Privacy settings */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Privacy</h2>
        <p style={subStyle}>Control what others can see on your profile</p>
        <SettingRow label="Public Profile"   desc="Allow others to find your donor profile"    value={privacy.showProfile}    onChange={v => setPrivacy(p=>({...p,showProfile:v}))} />
        <SettingRow label="Show Blood Group" desc="Display your blood group on your profile"   value={privacy.showBloodGroup} onChange={v => setPrivacy(p=>({...p,showBloodGroup:v}))} />
        <div style={{ ...labelStyle, borderBottom:'none' }}>
          <div style={{ flex:1, marginRight:16 }}>
            <p style={{ fontFamily:FONT_DISPLAY, fontWeight:600, fontSize:13, color:'var(--text-primary)', margin:'0 0 2px' }}>Show Location</p>
            <p style={{ fontSize:11, color:'var(--text-faint)', margin:0, fontFamily:FONT_BODY }}>Show your district/upazila on your profile</p>
          </div>
          <Toggle value={privacy.showLocation} onChange={v => setPrivacy(p=>({...p,showLocation:v}))} />
        </div>
      </div>

      {/* Danger zone */}
      <div style={{ ...sectionStyle, borderColor:'rgba(192,7,7,0.3)', backgroundColor:'rgba(192,7,7,0.03)' }}>
        <h2 style={{ ...headingStyle, color:'#C00707' }}>Danger Zone</h2>
        <p style={subStyle}>These actions are permanent and cannot be undone</p>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px', borderRadius:12, border:'1px solid var(--border)', backgroundColor:'var(--bg-base)', flexWrap:'wrap', gap:10 }}>
            <div>
              <p style={{ fontFamily:FONT_DISPLAY, fontWeight:600, fontSize:13, color:'var(--text-primary)', margin:'0 0 2px' }}>Sign Out Everywhere</p>
              <p style={{ fontSize:11, color:'var(--text-faint)', margin:0, fontFamily:FONT_BODY }}>Log out of your account on this device</p>
            </div>
            <button onClick={() => setConfirmLogout(true)}
              style={{ padding:'8px 16px', borderRadius:10, border:'1px solid rgba(192,7,7,0.3)', backgroundColor:'rgba(192,7,7,0.08)', color:'#C00707', fontSize:12, fontFamily:FONT_DISPLAY, fontWeight:700, cursor:'pointer', flexShrink:0, transition:'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor='#C00707'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(192,7,7,0.08)'; e.currentTarget.style.color='#C00707'; }}
            >Sign Out</button>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px', borderRadius:12, border:'1px solid rgba(192,7,7,0.2)', backgroundColor:'rgba(192,7,7,0.05)', flexWrap:'wrap', gap:10 }}>
            <div>
              <p style={{ fontFamily:FONT_DISPLAY, fontWeight:600, fontSize:13, color:'#C00707', margin:'0 0 2px' }}>Delete Account</p>
              <p style={{ fontSize:11, color:'var(--text-faint)', margin:0, fontFamily:FONT_BODY }}>Permanently delete your account and all data</p>
            </div>
            <button onClick={() => setConfirmDelete(true)}
              style={{ padding:'8px 16px', borderRadius:10, border:'none', backgroundColor:'#C00707', color:'#fff', fontSize:12, fontFamily:FONT_DISPLAY, fontWeight:700, cursor:'pointer', flexShrink:0 }}
            >Delete Account</button>
          </div>
        </div>
      </div>

      {/* Logout confirm */}
      {confirmLogout && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
          <div style={{ backgroundColor:'var(--bg-base)', borderRadius:16, padding:28, maxWidth:360, width:'100%', border:'1px solid var(--border)' }}>
            <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:16, color:'var(--text-primary)', margin:'0 0 10px' }}>Sign Out?</h3>
            <p style={{ fontSize:13, color:'var(--text-muted)', margin:'0 0 22px', fontFamily:FONT_BODY }}>You will be redirected to the login page.</p>
            <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
              <button onClick={()=>setConfirmLogout(false)} style={{ padding:'9px 18px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FONT_DISPLAY, cursor:'pointer' }}>Cancel</button>
              <button onClick={handleLogout} style={{ padding:'9px 18px', borderRadius:10, border:'none', backgroundColor:'#C00707', color:'#fff', fontSize:12, fontFamily:FONT_DISPLAY, fontWeight:700, cursor:'pointer' }}>Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
          <div style={{ backgroundColor:'var(--bg-base)', borderRadius:16, padding:28, maxWidth:380, width:'100%', border:'1px solid rgba(192,7,7,0.3)' }}>
            <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:16, color:'#C00707', margin:'0 0 10px' }}>⚠️ Delete Account?</h3>
            <p style={{ fontSize:13, color:'var(--text-muted)', margin:'0 0 22px', fontFamily:FONT_BODY }}>This will permanently delete your account and all associated data. This action <strong>cannot be undone</strong>.</p>
            <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
              <button onClick={()=>setConfirmDelete(false)} style={{ padding:'9px 18px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FONT_DISPLAY, cursor:'pointer' }}>Cancel</button>
              <button onClick={handleDeleteAccount} style={{ padding:'9px 18px', borderRadius:10, border:'none', backgroundColor:'#C00707', color:'#fff', fontSize:12, fontFamily:FONT_DISPLAY, fontWeight:700, cursor:'pointer' }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;