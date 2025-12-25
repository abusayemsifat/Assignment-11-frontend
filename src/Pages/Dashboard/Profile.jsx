import { updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import auth from '../../Firebase/firebase.config';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxios from '../../hooks/useAxios';
import axios from 'axios';

const Profile = () => {

    const { user, setUser } = useContext(AuthContext)
    console.log(user)

    const [isOpen, setIsOpen] = useState(false)

    const axiosInstance = useAxios()
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        if (user?.email) {
            axiosInstance.get(`/users/role/${user.email}`)
                .then(res => {
                    setUserData(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [user?.email, axiosInstance])

    const handleOpenForm = () => {
        setIsOpen(!isOpen)
    }

    const handleUpdate = async (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;

    let mainPhotoUrl = user?.photoURL; // Keep existing photo by default

    // Upload new photo if file is selected
    if (photoUrl.files[0]) {
        const file = photoUrl.files[0];
        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=8e9f55218ce652e2b63014e113632992`,
                { image: file },
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            mainPhotoUrl = res.data.data.display_url;
        } catch (error) {
            console.log("Image upload error:", error);
        }
    }

    updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: mainPhotoUrl
    }).then(() => {
        setUser({ ...user, photoURL: mainPhotoUrl, displayName: name })
        
        const updatedData = {
            name,
            mainPhotoUrl,
            district,
            upazila
        };
        
        axiosInstance.patch(`/users/update/${user.email}`, updatedData)
            .then(res => {
                console.log("Database updated:", res.data);
                setUserData({ ...userData, district, upazila });
                setIsOpen(false); 
            })
            .catch(err => {
                console.log("Database update error:", err);
            });
    }).catch((error) => {
        console.log(error)
    });
}

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={user?.photoURL} />
                </div>
            </div>
            <p className='font-bold text-xl'>{user?.displayName}</p>
            <p>{user?.email}</p>

            <button onClick={handleOpenForm} className="btn">Edit</button>
            {
                <form onSubmit={handleUpdate} className="fieldset">
                    <label className="label">Name</label>
                    <input disabled name='name' type="text" className="input" placeholder="Name" defaultValue={user?.displayName} />
                    <label className="label">PhotoUrl</label>
                    <input disabled={!isOpen} name='photoUrl' type="file" className="input" placeholder="Enter your photoUrl" />
                    <label className="label">Email</label>
                    <input disabled name='email' type="email" className="input" placeholder="Email" defaultValue={user?.email} />
                    <label className="label">Blood Group</label>
                    <input disabled name='blood_group' type="text" className="input" placeholder="Blood Group" defaultValue={userData?.blood || ''} />
                    <label className="label">District</label>
                    <input disabled={!isOpen} name='district' type="text" className="input" placeholder="District" defaultValue={userData?.district || ''} />
                    <label className="label">Upazila</label>
                    <input disabled={!isOpen} name='upazila' type="text" className="input" placeholder="Upazila" defaultValue={userData?.upazila || ''} />

                    <button className="btn btn-primary">Save</button>

                </form>


            }
        </div>
    );
};

export default Profile;