import React from 'react';
import heroimg from '../../assets/Blood-Donation-1.jpg'
import userimg from '../../assets/pngtree.jpg'
import { Link } from 'react-router';

const Home = () => {
    return (
        <div className='bg-red-50 flex flex-col items-center'>
            <img src={heroimg} alt="" className='w-full' />
            <div className='flex gap-12 my-4'>
                <Link to={'/signup'}><button className='btn btn-error text-white font-bold text-xl p-3'>Join as a donor</button></Link>
                <Link to={'/search'}><button className='btn btn-error text-white font-bold text-xl p-3'>Search Donors</button></Link>
            </div>
            <div className='flex flex-col items-center'>
                <h1 className='font-bold text-6xl text-red-400 mt-10'>Featured donors</h1>
                <div className='flex gap-20 w-full my-15'>
                    <div>
                        <div className="card bg-base-100 w-80 shadow-sm">
                            <figure>
                                <img
                                    src={userimg}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">John Doe</h2>
                                <p>Blood Group: AB+</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card bg-base-100 w-80 shadow-sm">
                            <figure>
                                <img
                                    src={userimg}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Mr. Robin</h2>
                                <p>Blood Group: AB-</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card bg-base-100 w-80 shadow-sm">
                            <figure>
                                <img
                                    src={userimg}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Aslam khan</h2>
                                <p>Blood Group: B+</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className='font-bold text-6xl text-red-400 mt-10'>Contact Us</h1>
                <div>
                    <div className='bg-red-300 rounded-2xl p-5 my-10'>
                        <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input
                            type="text"
                            required
                            placeholder="Name"
                            pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minlength="3"
                            maxlength="30"
                            title="Only letters, numbers or dash"
                        />
                    </label>
                    <p className="validator-hint">
                        Must be 3 to 30 characters
                        <br />containing only letters, numbers or dash
                    </p>
                    <div className="join">
                        <div>
                            <label className="input validator join-item">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </g>
                                </svg>
                                <input type="email" placeholder="mail@site.com" required />
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </div>
                        <button className="btn btn-neutral join-item">Join</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;