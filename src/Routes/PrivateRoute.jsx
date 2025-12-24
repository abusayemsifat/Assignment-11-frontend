import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <p>Loading.................</p>
    }

    if(!user){
        return <Navigate to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;