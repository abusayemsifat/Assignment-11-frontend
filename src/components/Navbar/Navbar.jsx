import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';

const Navbar = () => {

    const { user } = useContext(AuthContext)

    const logout = () => {
        signOut(auth)
    }

    return (
        <div className="navbar bg-red-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>All request</a></li>
                        <li><Link to={'/search'}>Search</Link></li>
                        <li><Link to={'/donate'}>Donate</Link></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-bold text-red-500">BLOOD+</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>All request</a></li>
                    <li><Link to={'/search'}>Search</Link></li>
                    <li><Link to={'/donate'}>Donate</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user && <Link to={'/dashboard'} className="btn mr-2">Dashboard</Link>
                }
                {
                    user ? (<button onClick={logout} className='btn'>Logout</button>) : <Link to={'/login'} className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;