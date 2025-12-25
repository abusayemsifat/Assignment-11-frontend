import React from 'react';
import heroimg from '../../assets/Blood-Donation-1.jpg'
import { Link } from 'react-router';

const Home = () => {
    return (
        <div className='bg-red-50 flex flex-col items-center'>
            <img src={heroimg} alt="" className='w-full' />
            <div className='flex gap-12 my-4'>
                <Link to={'/signup'}><button className='btn btn-error text-white font-bold text-xl p-3'>Join as a donor</button></Link>
                <Link to={'/search'}><button className='btn btn-error text-white font-bold text-xl p-3'>Search Donors</button></Link>
            </div>
        </div>
    );
};

export default Home;