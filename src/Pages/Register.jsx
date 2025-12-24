import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Register = () => {
    const { registerWithEmailPassword, setUser, user, handleGoogleSignin } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')

    useEffect(()=>{
        axios.get('./upazila.json')
        .then(res=>{
            setUpazilas(res.data.upazilas)
        })

        axios.get('./district.json')
        .then(res=>{
            setDistricts(res.data.districts)
        })

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl;
        const file = photoUrl.files[0];
        const blood = e.target.blood.value;


        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (pass.length < 6) {
            return alert("less than 6 charecters")
        }

        if (!uppercase.test(pass)) {
            return alert("Need an Uppercase")
        }

        if (!lowercase.test(pass)) {
            return alert("Need a Lowercase")
        }

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=8e9f55218ce652e2b63014e113632992`, { image: file }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const mainPhotoUrl = res.data.data.display_url

        const formData = {
            email,
            pass,
            name,
            mainPhotoUrl,
            blood,
            district,
            upazila
        }
        console.log(formData)


        if (res.data.success == true) {
            registerWithEmailPassword(email, pass)
                .then((userCredential) => {

                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: mainPhotoUrl
                    }).then(() => {
                        setUser(userCredential.user)
                        axios.post('https://backend-11-cyan.vercel.app//users', formData)
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }).catch((error) => {
                        console.log(error)
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }




    console.log(user);

    const googleSignup = () => {
        handleGoogleSignin()
            .then(result => {
                const user = result.user
                setUser(user)
                Navigate(location.state)
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="fieldset">
                                <label className="label">Name</label>
                                <input name='name' type="text" className="input" placeholder="Your Full Name" />
                                <label className="label">Email</label>
                                <input name='email' type="email" className="input" placeholder="Email" />
                                <label className="label">PhotoUrl</label>
                                <input name='photoUrl' type="file" className="input" placeholder="Enter your photoUrl" />
                                 <label className="label">Blood Group</label>
                                <select name='blood' defaultValue="Choose Blood Group" className="select">
                                    <option value="" disabled selected>Select blood group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A−</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B−</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB−</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O−</option>
                                </select>

                                 <label className="label">District</label>
                                <select value={district} onChange={(e)=> setDistrict(e.target.value)} className="select">
                                    <option disabled selected value="">Select Your District</option>
                                    {
                                        districts.map(d=> <option value={d?.name} key={d.id}>{d?.name}</option>)
                                    }
                                </select>

                                 <label className="label">Upazila</label>
                                <select value={upazila} onChange={(e)=> setUpazila(e.target.value)} className="select">
                                    <option disabled selected value="">Select Your Upazila</option>
                                    {
                                        upazilas.map(u=> <option value={u?.name} key={u.id}>{u?.name}</option>)
                                    }
                                </select>

                                <label className="label">Password</label>
                                <input name='password' type="password" className="input" placeholder="Password" />

                                <button onClick={googleSignup} className="btn"><FcGoogle /></button>

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <div><span>Already have an account? </span><Link className='text-blue-500' to='/login'>Login</Link></div>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;