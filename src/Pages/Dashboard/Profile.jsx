import { updatePassword, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import auth from '../../Firebase/firebase.config';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../hooks/useAxios';
import axios from 'axios';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const inputStyle = {
  width:'100%', padding:'11px 14px', borderRadius:10,
  border:'1px solid var(--border)', backgroundColor:'var(--bg-base)',
  color:'var(--text-primary)', fontSize:13, fontFamily:FB,
  outline:'none', boxSizing:'border-box', transition:'border-color 0.18s',
};
const disabledStyle = { ...inputStyle, backgroundColor:'var(--bg-muted)', color:'var(--text-muted)', cursor:'not-allowed' };
const labelStyle    = { display:'block', marginBottom:6, fontFamily:FB, fontWeight:600, fontSize:13, color:'var(--text-primary)' };
const focus = e => e.target.style.borderColor = '#C00707';
const blur  = e => e.target.style.borderColor = 'var(--border)';

const roleConfig = {
  admin: { bg: 'rgba(192,7,7,0.15)', color: '#C00707', icon: '🛡️', label: 'Admin' },
  donor: { bg: 'rgba(19,78,142,0.15)', color: '#60a5fa', icon: '🩸', label: 'Donor' },
  volunteer: { bg: 'rgba(22,101,52,0.15)', color: '#4ade80', icon: '🤝', label: 'Volunteer' }
};

const Profile = () => {
  const { user, setUser, role } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [tab,       setTab]       = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState('');
  const [error,     setError]     = useState('');
  const [userData,  setUserData]  = useState(null);

  const [pwForm, setPwForm] = useState({ current:'', newPw:'', confirm:'' });
  const [pwErrors, setPwErrors] = useState({});
  const [pwSaving, setPwSaving] = useState(false);

  const userRole = roleConfig[role] || roleConfig.donor;

  useEffect(() => {
    if (user?.email) {
      axiosInstance.get(`/users/role/${user.email}`)
        .then(res => setUserData(res.data))
        .catch(() => {});
    }
  }, [user?.email, axiosInstance]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSaved('');
    const name     = e.target.name.value.trim();
    const district = e.target.district.value.trim();
    const upazila  = e.target.upazila.value.trim();
    const fileInput = e.target.photoUrl;
    let photoURL = user?.photoURL;

    if (fileInput.files[0]) {
      try {
        const fd = new FormData();
        fd.append('image', fileInput.files[0]);
        const res = await axios.post('https://api.imgbb.com/1/upload?key=8e9f55218ce652e2b63014e113632992', fd);
        photoURL = res.data.data.display_url;
      } catch { setError('Image upload failed. Other changes were not saved.'); setSaving(false); return; }
    }

    try {
      await updateProfile(auth.currentUser, { displayName:name, photoURL });
      setUser({ ...user, photoURL, displayName:name });
      await axiosInstance.patch(`/users/update/${user.email}`, { name, mainPhotoUrl:photoURL, district, upazila });
      setUserData(d => ({ ...d, district, upazila }));
      setIsEditing(false);
      setSaved('Profile updated successfully!');
      setTimeout(() => setSaved(''), 4000);
    } catch { setError('Failed to save. Please try again.'); }
    finally { setSaving(false); }
  };

  const validatePw = () => {
    const e = {};
    if (!pwForm.current)                e.current = 'Current password is required';
    if (!pwForm.newPw)                  e.newPw   = 'New password is required';
    else if (pwForm.newPw.length < 6)   e.newPw   = 'Must be at least 6 characters';
    else if (!/[A-Z]/.test(pwForm.newPw)) e.newPw = 'Must include an uppercase letter';
    else if (!/[0-9]/.test(pwForm.newPw)) e.newPw = 'Must include a number';
    if (pwForm.newPw !== pwForm.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const errs = validatePw();
    if (Object.keys(errs).length) { setPwErrors(errs); return; }
    setPwErrors({}); setPwSaving(true); setError(''); setSaved('');
    try {
      const cred = EmailAuthProvider.credential(user.email, pwForm.current);
      await reauthenticateWithCredential(auth.currentUser, cred);
      await updatePassword(auth.currentUser, pwForm.newPw);
      setSaved('Password updated successfully!');
      setPwForm({ current:'', newPw:'', confirm:'' });
      setTimeout(() => setSaved(''), 4000);
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setPwErrors({ current:'Current password is incorrect' });
      } else {
        setError('Failed to update password. Please try again.');
      }
    } finally { setPwSaving(false); }
  };

  return (
    <div style={{ fontFamily:FB, maxWidth:640 }}>
      <h1 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(18px,3vw,22px)', color:'var(--text-primary)', marginBottom:24, marginTop:0 }}>
        My Profile
      </h1>

      <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:20, padding:'24px', marginBottom:20, display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
        <div style={{ width:80, height:80, borderRadius:'50%', overflow:'hidden', backgroundColor:'var(--bg-muted)', flexShrink:0, border:'3px solid rgba(192,7,7,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {user?.photoURL
            ? <img src={user.photoURL} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            : <span style={{ fontSize:32 }}>👤</span>
          }
        </div>
        <div style={{ flex:1 }}>
          <p style={{ fontFamily:FD, fontWeight:800, fontSize:18, color:'var(--text-primary)', margin:'0 0 2px' }}>{user?.displayName||'User'}</p>
          <p style={{ fontSize:13, color:'var(--text-muted)', margin:'0 0 6px' }}>{user?.email}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {userData?.blood && (
              <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:8, backgroundColor:'rgba(192,7,7,0.15)', color:'#C00707', fontFamily:FD, fontWeight:700, fontSize:13 }}>
                {userData.blood}
              </span>
            )}
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '3px 10px',
              borderRadius: '20px',
              backgroundColor: userRole.bg,
              color: userRole.color,
              fontSize: '12px',
              fontWeight: 600
            }}>
              <span>{userRole.icon}</span>
              <span>{userRole.label}</span>
            </span>
          </div>
        </div>
      </div>

      {saved && (
        <div style={{ padding:'12px 16px', borderRadius:10, backgroundColor:'rgba(22,101,52,0.15)', color:'#4ade80', fontFamily:FB, fontSize:13, marginBottom:16, border:'1px solid rgba(22,101,52,0.25)' }}>
          ✅ {saved}
        </div>
      )}
      {error && (
        <div style={{ padding:'12px 16px', borderRadius:10, backgroundColor:'rgba(192,7,7,0.1)', color:'#C00707', fontFamily:FB, fontSize:13, marginBottom:16, border:'1px solid rgba(192,7,7,0.2)' }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ display:'flex', gap:4, marginBottom:20, backgroundColor:'var(--bg-subtle)', padding:4, borderRadius:12, border:'1px solid var(--border)' }}>
        {[
          { key:'profile',  label:'Profile Info' },
          { key:'password', label:'Change Password' },
        ].map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setError(''); setSaved(''); setPwErrors({}); }}
            style={{ flex:1, padding:'9px', borderRadius:9, border:'none', fontFamily:FD, fontWeight:700, fontSize:13, cursor:'pointer', transition:'all 0.18s',
              backgroundColor: tab===t.key ? '#C00707' : 'transparent',
              color: tab===t.key ? '#fff' : 'var(--text-muted)',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:20, padding:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <p style={{ fontFamily:FD, fontWeight:700, fontSize:15, color:'var(--text-primary)', margin:0 }}>Personal Information</p>
            <button onClick={() => { setIsEditing(v => !v); setError(''); }}
              style={{ padding:'8px 16px', borderRadius:10, border:'1px solid var(--border)', backgroundColor: isEditing ? 'rgba(192,7,7,0.1)' : 'var(--bg-base)', color: isEditing ? '#C00707' : 'var(--text-muted)', fontFamily:FB, fontWeight:600, fontSize:12, cursor:'pointer', transition:'all 0.18s' }}>
              {isEditing ? 'Cancel' : '✏️ Edit Profile'}
            </button>
          </div>
          <form onSubmit={handleUpdate}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
              <div>
                <label htmlFor="pf-name" style={labelStyle}>Full Name</label>
                <input id="pf-name" name="name" type="text" defaultValue={user?.displayName} disabled={!isEditing}
                  style={isEditing ? inputStyle : disabledStyle} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={labelStyle}>Email (read-only)</label>
                <input type="email" defaultValue={user?.email} disabled style={disabledStyle} />
              </div>
              <div>
                <label style={labelStyle}>Blood Group (read-only)</label>
                <input type="text" defaultValue={userData?.blood||''} disabled style={disabledStyle} />
              </div>
              <div>
                <label htmlFor="pf-photo" style={labelStyle}>Profile Photo</label>
                <input id="pf-photo" name="photoUrl" type="file" accept="image/*" disabled={!isEditing}
                  style={{ ...(isEditing ? inputStyle : disabledStyle), padding:'8px 12px' }} />
              </div>
              <div>
                <label htmlFor="pf-district" style={labelStyle}>District</label>
                <input id="pf-district" name="district" type="text" defaultValue={userData?.district||''} disabled={!isEditing}
                  style={isEditing ? inputStyle : disabledStyle} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label htmlFor="pf-upazila" style={labelStyle}>Upazila</label>
                <input id="pf-upazila" name="upazila" type="text" defaultValue={userData?.upazila||''} disabled={!isEditing}
                  style={isEditing ? inputStyle : disabledStyle} onFocus={focus} onBlur={blur} />
              </div>
            </div>
            {isEditing && (
              <button type="submit" disabled={saving}
                style={{ marginTop:20, width:'100%', padding:'13px', borderRadius:12, border:'none', cursor:saving?'not-allowed':'pointer', background:'linear-gradient(135deg,#C00707,#FF4400)', color:'#fff', fontFamily:FD, fontWeight:700, fontSize:14, opacity:saving?0.7:1, transition:'opacity 0.18s,transform 0.2s' }}
                onMouseEnter={e => { if(!saving) e.currentTarget.style.transform='scale(1.01)'; }}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </form>
        </div>
      )}

      {tab === 'password' && (
        <div style={{ backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:20, padding:24 }}>
          <p style={{ fontFamily:FD, fontWeight:700, fontSize:15, color:'var(--text-primary)', margin:'0 0 6px' }}>Change Password</p>
          <p style={{ fontSize:13, color:'var(--text-muted)', margin:'0 0 22px', fontFamily:FB }}>
            Must be at least 6 characters, include an uppercase letter and a number.
          </p>
          <form onSubmit={handlePasswordUpdate} style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <div>
              <label htmlFor="pw-current" style={labelStyle}>Current Password</label>
              <input id="pw-current" type="password" placeholder="Your current password"
                value={pwForm.current} onChange={e => setPwForm(f=>({...f,current:e.target.value}))}
                style={{ ...inputStyle, borderColor: pwErrors.current ? '#C00707' : 'var(--border)' }}
                onFocus={focus} onBlur={blur} />
              {pwErrors.current && <p style={{ fontSize:11, color:'#C00707', margin:'4px 0 0', fontFamily:FB }}>{pwErrors.current}</p>}
            </div>
            <div>
              <label htmlFor="pw-new" style={labelStyle}>New Password</label>
              <input id="pw-new" type="password" placeholder="At least 6 chars, 1 uppercase, 1 number"
                value={pwForm.newPw} onChange={e => setPwForm(f=>({...f,newPw:e.target.value}))}
                style={{ ...inputStyle, borderColor: pwErrors.newPw ? '#C00707' : 'var(--border)' }}
                onFocus={focus} onBlur={blur} />
              {pwErrors.newPw && <p style={{ fontSize:11, color:'#C00707', margin:'4px 0 0', fontFamily:FB }}>{pwErrors.newPw}</p>}
            </div>
            <div>
              <label htmlFor="pw-confirm" style={labelStyle}>Confirm New Password</label>
              <input id="pw-confirm" type="password" placeholder="Repeat new password"
                value={pwForm.confirm} onChange={e => setPwForm(f=>({...f,confirm:e.target.value}))}
                style={{ ...inputStyle, borderColor: pwErrors.confirm ? '#C00707' : 'var(--border)' }}
                onFocus={focus} onBlur={blur} />
              {pwErrors.confirm && <p style={{ fontSize:11, color:'#C00707', margin:'4px 0 0', fontFamily:FB }}>{pwErrors.confirm}</p>}
            </div>
            <button type="submit" disabled={pwSaving}
              style={{ padding:'13px', borderRadius:12, border:'none', cursor:pwSaving?'not-allowed':'pointer', background:'linear-gradient(135deg,#C00707,#FF4400)', color:'#fff', fontFamily:FD, fontWeight:700, fontSize:14, opacity:pwSaving?0.7:1, transition:'opacity 0.18s' }}>
              {pwSaving ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;