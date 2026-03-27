import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";

const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '1px solid var(--border)', backgroundColor: 'var(--bg-base)',
    color: 'var(--text-primary)', fontSize: 13, fontFamily: FONT_BODY,
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.18s',
};
const readonlyStyle = { ...inputStyle, backgroundColor: 'var(--bg-muted)', color: 'var(--text-muted)', cursor: 'not-allowed' };
const labelStyle = { display: 'block', marginBottom: 6, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' };

const AddRequest = () => {
    const { user } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
        axios.get('/district.json').then(res => setDistricts(res.data.districts));
    }, []);

    const handleRequest = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = {
            requester_name: form.requester_name.value,
            requester_email: form.requester_email.value,
            recipient_name: form.recipient_name.value,
            recipient_district: district,
            recipient_upazila: upazila,
            hospital_name: form.hospital_name.value,
            full_address: form.full_address.value,
            blood_group: form.blood_group.value,
            donation_date: form.donation_date.value,
            donation_time: form.donation_time.value,
            request_message: form.request_message.value,
            donation_status: 'pending',
        };
        axiosSecure.post('/requests', formData)
            .then(() => setSubmitted(true))
            .catch(err => console.log(err));
    };

    const focus = (e) => { e.target.style.borderColor = '#C00707'; };
    const blur = (e) => { e.target.style.borderColor = 'var(--border)'; };

    if (submitted) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: 16 }}>
                <div style={{ fontSize: 60 }}>✅</div>
                <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', margin: 0 }}>Request Submitted!</h2>
                <p style={{ fontFamily: FONT_BODY, color: 'var(--text-muted)', fontSize: 14 }}>Your blood donation request has been sent successfully.</p>
                <button onClick={() => setSubmitted(false)} style={{ padding: '10px 22px', borderRadius: 10, border: 'none', backgroundColor: '#C00707', color: '#fff', fontFamily: FONT_BODY, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                    + New Request
                </button>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: FONT_BODY }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg,#C00707,#FF4400)',
                borderRadius: 16, padding: '22px 24px', marginBottom: 28,
            }}>
                <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(18px,3vw,22px)', color: '#fff', margin: 0 }}>
                    🩸 Blood Donation Request
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: '6px 0 0', fontFamily: FONT_BODY }}>
                    Fill in the details to create a new blood request
                </p>
            </div>

            <div style={{
                backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '28px', maxWidth: 680,
            }}>
                <form onSubmit={handleRequest}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18 }}>

                        <div>
                            <label style={labelStyle}>Requester Name</label>
                            <input type="text" name="requester_name" value={user?.displayName || ''} readOnly style={readonlyStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Requester Email</label>
                            <input type="email" name="requester_email" value={user?.email || ''} readOnly style={readonlyStyle} />
                        </div>

                        <div style={{ gridColumn: '1/-1' }}>
                            <label style={labelStyle}>Recipient Name *</label>
                            <input type="text" name="recipient_name" required style={inputStyle} onFocus={focus} onBlur={blur} placeholder="Full name of recipient" />
                        </div>

                        <div>
                            <label style={labelStyle}>Recipient District *</label>
                            <select value={district} onChange={e => setDistrict(e.target.value)} name="recipient_district" required style={inputStyle} onFocus={focus} onBlur={blur}>
                                <option value="" disabled>Select district</option>
                                {districts.map(d => <option value={d.name} key={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Recipient Upazila *</label>
                            <select value={upazila} onChange={e => setUpazila(e.target.value)} name="recipient_upazila" required style={inputStyle} onFocus={focus} onBlur={blur}>
                                <option value="" disabled>Select upazila</option>
                                {upazilas.map(u => <option value={u.name} key={u.id}>{u.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>Hospital Name *</label>
                            <input type="text" name="hospital_name" required style={inputStyle} onFocus={focus} onBlur={blur} placeholder="e.g. Dhaka Medical College" />
                        </div>
                        <div>
                            <label style={labelStyle}>Blood Group *</label>
                            <select name="blood_group" required style={inputStyle} onFocus={focus} onBlur={blur}>
                                <option value="">Select blood group</option>
                                {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>

                        <div style={{ gridColumn: '1/-1' }}>
                            <label style={labelStyle}>Full Address *</label>
                            <input type="text" name="full_address" required style={inputStyle} onFocus={focus} onBlur={blur} placeholder="Street address, area" />
                        </div>

                        <div>
                            <label style={labelStyle}>Donation Date *</label>
                            <input type="date" name="donation_date" required style={inputStyle} onFocus={focus} onBlur={blur} />
                        </div>
                        <div>
                            <label style={labelStyle}>Donation Time *</label>
                            <input type="time" name="donation_time" required style={inputStyle} onFocus={focus} onBlur={blur} />
                        </div>

                        <div style={{ gridColumn: '1/-1' }}>
                            <label style={labelStyle}>Request Message *</label>
                            <textarea
                                name="request_message" rows={4} required
                                placeholder="Explain why you need blood donation..."
                                style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                                onFocus={focus} onBlur={blur}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{
                            marginTop: 24, width: '100%', padding: '14px',
                            borderRadius: 12, border: 'none', cursor: 'pointer',
                            background: 'linear-gradient(135deg,#C00707,#FF4400)',
                            color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 700,
                            fontSize: 15, transition: 'opacity 0.18s',
                        }}
                        onMouseEnter={e => e.target.style.opacity = '0.88'}
                        onMouseLeave={e => e.target.style.opacity = '1'}
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRequest;