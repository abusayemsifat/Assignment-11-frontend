import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddRequest = () => {

    const { user } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => {
                setUpazilas(res.data.upazilas)
            })

        axios.get('/district.json')
            .then(res => {
                setDistricts(res.data.districts)
            })

    }, [])

    const handleRequest = (e) => {
        e.preventDefault();
        const form = e.target

        const requester_name = form.requester_name.value
        const requester_email = form.requester_email.value
        const recipient_name = form.recipient_name.value
        const recipient_district = district
        const recipient_upazila = upazila
        const hospital_name = form.hospital_name.value
        const full_address = form.full_address.value
        const blood_group = form.blood_group.value


        const formData = {
            requester_name,
            requester_email,
            recipient_name,
            recipient_district,
            recipient_upazila,
            hospital_name,
            full_address,
            blood_group,
            donation_status: 'pending'
        }

        axiosSecure.post('/requests', formData)
        .then(res=>{
            alert(res.data.insertedId)
        }).catch(err=> console.log(err))

    }

    return (
        <div>
            <form
            onSubmit={handleRequest}
                style={{
                    maxWidth: '600px',
                    margin: 'auto',
                    fontFamily: 'Arial, sans-serif',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                }}
            >
                <h2 style={{ textAlign: 'center', color: '#333' }}>Blood Donation Request Form</h2>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Requester Name</label>
                    <input
                        type="text"
                        name="requester_name"
                        value={user?.displayName}
                        readOnly
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            backgroundColor: '#f5f5f5'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Requester Email</label>
                    <input
                        type="email"
                        name="requester_email"
                        value={user?.email}
                        readOnly
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            backgroundColor: '#f5f5f5'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Recipient Name *</label>
                    <input
                        type="text"
                        name="recipient_name"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Recipient District *</label>
                    <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        name="recipient_district"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    >
                        <option disabled selected value="">Select Your District</option>
                        {
                            districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                        }
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Recipient Upazila *</label>
                    <select
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        name="recipient_upazila"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    >
                        <option disabled selected value="">Select Your Upazila</option>
                        {
                            upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
                        }
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hospital Name *</label>
                    <input
                        type="text"
                        name="hospital_name"
                        placeholder="Dhaka Medical College Hospital"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Address Line *</label>
                    <input
                        type="text"
                        name="full_address"
                        placeholder="Zahir Raihan Rd, Dhaka"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Blood Group *</label>
                    <select
                        name="blood_group"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    >
                        <option value="">-- Select Blood Group --</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Donation Date *</label>
                    <input
                        type="date"
                        name="donation_date"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Donation Time *</label>
                    <input
                        type="time"
                        name="donation_time"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Request Message *</label>
                    <textarea
                        name="request_message"
                        rows="4"
                        placeholder="Explain why you need blood..."
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            resize: 'vertical'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        marginTop: '15px',
                        padding: '12px 24px',
                        cursor: 'pointer',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        width: '100%',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                    Request
                </button>
            </form>
        </div>
    );
};

export default AddRequest;