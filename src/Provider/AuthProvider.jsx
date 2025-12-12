import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const registerWithEmailPassword = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const handleGoogleSignin = () =>{
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

    const authData = {
        registerWithEmailPassword,
        setUser,
        user,
        handleGoogleSignin,
        loading
    }

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    )
};

export default AuthProvider;