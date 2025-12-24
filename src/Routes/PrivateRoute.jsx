import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading, roleLoading, userStatus} = useContext(AuthContext)

    if(loading || roleLoading){
        return <p>Loading.................</p>
    }

    if(!user || !userStatus=='active'){
        return <Navigate to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;