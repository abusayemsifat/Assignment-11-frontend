import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');

    const registerWithEmailPassword = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const handleGoogleSignin = () => {
        return signInWithPopup(auth, googleProvider)
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }

    }, [])

    useEffect(() => {
        if (!user) return;
        axios.get(`http://localhost:5000/users/role/${user.email}`)
            .then(res => {
                setRole(res.data.role)
            })
    }, [user])

    console.log(role)

    const authData = {
        registerWithEmailPassword,
        setUser,
        user,
        handleGoogleSignin,
        loading,
        role,
    }

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    )
};

export default AuthProvider;