import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([])

    const fetchUsers = () =>{
        axiosSecure.get('/users')
        .then(res => {
            setUsers(res.data)
        })
    }

    useEffect(() => {
       fetchUsers();
    }, [axiosSecure])

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                console.log(res.data)
                fetchUsers();
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>User Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map(user =>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.mainPhotoUrl}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.name}</div>
                                                <div className="text-sm opacity-50">{user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.role}
                                    </td>
                                    <td>{user?.status}</td>
                                    <th>
                                        {
                                            user?.status == 'active'
                                                ? (<button onClick={() => handleStatusChange(user?.email, 'blocked')} className="btn btn-error text-white btn-xs">Block</button>)
                                                : (<button onClick={() => handleStatusChange(user?.email, 'active')} className="btn btn-ghost btn-xs">Active</button>)
                                        }
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;