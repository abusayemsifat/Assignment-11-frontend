import { updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import auth from '../../Firebase/firebase.config';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../hooks/useAxios';
import axios from 'axios';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '1px solid var(--border)', backgroundColor: 'var(--bg-base)',
    color: 'var(--text-primary)', fontSize: 13, fontFamily: FONT_BODY,
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.18s',
};
const disabledStyle = { ...inputStyle, backgroundColor: 'var(--bg-muted)', color: 'var(--text-muted)', cursor: 'not-allowed' };
const labelStyle = { display: 'block', marginBottom: 6, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' };

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const axiosInstance = useAxios();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosInstance.get(`/users/role/${user.email}`)
                .then(res => setUserData(res.data))
                .catch(err => console.log(err));
        }
    }, [user?.email, axiosInstance]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl;
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;
        let mainPhotoUrl = user?.photoURL;

        if (photoUrl.files[0]) {
            try {
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=8e9f55218ce652e2b63014e113632992`,
                    { image: photoUrl.files[0] },
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                mainPhotoUrl = res.data.data.display_url;
            } catch (err) { console.log(err); }
        }

        updateProfile(auth.currentUser, { displayName: name, photoURL: mainPhotoUrl })
            .then(() => {
                setUser({ ...user, photoURL: mainPhotoUrl, displayName: name });
                axiosInstance.patch(`/users/update/${user.email}`, { name, mainPhotoUrl, district, upazila })
                    .then(res => {
                        setUserData({ ...userData, district, upazila });
                        setIsOpen(false);
                        setSaving(false);
                        setSaved(true);
                        setTimeout(() => setSaved(false), 3000);
                    });
            }).catch(err => { console.log(err); setSaving(false); });
    };

    return (
        <div style={{ fontFamily: FONT_BODY, maxWidth: 600 }}>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(18px,3vw,22px)', color: 'var(--text-primary)', marginBottom: 24, marginTop: 0 }}>
                My Profile
            </h1>

            {/* Avatar card */}
            <div style={{
                backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)',
                borderRadius: 20, padding: '28px 24px', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
            }}>
                <div style={{
                    width: 80, height: 80, borderRadius: '50%', overflow: 'hidden',
                    backgroundColor: 'var(--bg-muted)', flexShrink: 0,
                    border: '3px solid rgba(192,7,7,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {user?.photoURL
                        ? <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontSize: 32 }}>👤</span>
                    }
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 18, color: 'var(--text-primary)' }}>
                        {user?.displayName || 'User'}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>{user?.email}</div>
                    {userData?.blood && (
                        <span style={{ display: 'inline-block', marginTop: 8, padding: '3px 10px', borderRadius: 8, backgroundColor: 'rgba(192,7,7,0.15)', color: '#C00707', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13 }}>
                            {userData.blood}
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        padding: '9px 20px', borderRadius: 10, border: '1px solid var(--border)',
                        backgroundColor: isOpen ? 'rgba(192,7,7,0.12)' : 'var(--bg-base)',
                        color: isOpen ? '#C00707' : 'var(--text-primary)',
                        fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                        transition: 'all 0.18s',
                    }}
                >
                    {isOpen ? 'Cancel' : '✏️ Edit Profile'}
                </button>
            </div>

            {saved && (
                <div style={{ padding: '12px 16px', borderRadius: 10, backgroundColor: 'rgba(22,101,52,0.15)', color: '#4ade80', fontFamily: FONT_BODY, fontSize: 13, marginBottom: 16 }}>
                    ✅ Profile updated successfully!
                </div>
            )}

            {/* Form */}
            <div style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 20, padding: '24px' }}>
                <form onSubmit={handleUpdate}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
                        <div>
                            <label style={labelStyle}>Full Name</label>
                            <input name="name" type="text" defaultValue={user?.displayName} disabled={!isOpen}
                                style={isOpen ? inputStyle : disabledStyle}
                                onFocus={e => e.target.style.borderColor = '#C00707'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Email</label>
                            <input name="email" type="email" defaultValue={user?.email} disabled style={disabledStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Blood Group</label>
                            <input name="blood_group" type="text" defaultValue={userData?.blood || ''} disabled style={disabledStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Profile Photo</label>
                            <input name="photoUrl" type="file" accept="image/*" disabled={!isOpen}
                                style={{ ...( isOpen ? inputStyle : disabledStyle), padding: '8px 12px' }}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>District</label>
                            <input name="district" type="text" defaultValue={userData?.district || ''} disabled={!isOpen}
                                style={isOpen ? inputStyle : disabledStyle}
                                onFocus={e => e.target.style.borderColor = '#C00707'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Upazila</label>
                            <input name="upazila" type="text" defaultValue={userData?.upazila || ''} disabled={!isOpen}
                                style={isOpen ? inputStyle : disabledStyle}
                                onFocus={e => e.target.style.borderColor = '#C00707'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>
                    </div>

                    {isOpen && (
                        <button
                            type="submit" disabled={saving}
                            style={{
                                marginTop: 20, width: '100%', padding: '13px',
                                borderRadius: 12, border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                                background: 'linear-gradient(135deg,#C00707,#FF4400)',
                                color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 700,
                                fontSize: 14, opacity: saving ? 0.7 : 1, transition: 'opacity 0.18s',
                            }}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;