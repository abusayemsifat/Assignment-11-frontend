import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const MainDashBoard = () => {
    const { user } = useContext(AuthContext)
    const { role } = useContext(AuthContext)

    const [myRequests, setMyRequests] = useState([]);

    const axiosSecure = useAxiosSecure()
    console.log(user)
    console.log(role)

    useEffect(() => {
        axiosSecure.get(`/my-request`)
            .then(res => {
                setMyRequests(res.data.request)
            })
    }, [axiosSecure])

    const [totalDonors, setTotalDonors] = useState(0);

    useEffect(() => {
        axiosSecure.get('/total-donors')
            .then(res => {
                setTotalDonors(res.data.totalDonors);
            })
    }, [axiosSecure])

    const [totalRequests, setTotalRequests] = useState(0);

    useEffect(() => {
        axiosSecure.get('/total-requests')
            .then(res => {
                setTotalRequests(res.data.totalRequests);
            })
    }, [axiosSecure])

    return (
        <div className='flex flex-col justify-center'>
            <h1 className='text-5xl mx-auto font-bold text-red-400 mt-20 mb-10'>Welcome, {user?.displayName}</h1>

            {
                role === "admin" ? (
                    <div className='grid grid-cols-3 gap-6'>
                        <div className='w-[300px] h-[200px] bg-red-300 flex items-center justify-center rounded-xl'>
                            <h1 className='text-3xl font-bold'>Total User: {totalDonors}</h1>
                        </div>
                        <div className='w-[300px] h-[200px] bg-red-300 flex items-center justify-center rounded-xl'>
                            <h1 className='text-3xl font-bold'>Total Funding: {totalDonors}</h1>
                        </div>
                        <div className='w-[300px] h-[200px] bg-red-300 flex items-center justify-center rounded-xl'>
                            <h1 className='text-3xl font-bold'>Total Requests: {totalRequests}</h1>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Hospital Name</th>
                                    <th>Blood Group</th>
                                    <th>Donation Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myRequests.slice(0, 3).map((request, index) =>
                                        <tr key={request._id}>
                                            <th>{(index + 1)}</th>
                                            <td>{request.recipient_name}</td>
                                            <td>{request.hospital_name}</td>
                                            <td>{request.blood_group}</td>
                                            <td>{request.donation_status}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <Link to={'my-request'} className='mx-auto mt-10'><button className="btn btn-primary">View All</button></Link>
                    </div>

                )
            }


        </div>
    );
};

export default MainDashBoard;