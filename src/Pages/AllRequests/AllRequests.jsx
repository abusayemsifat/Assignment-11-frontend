import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

const AllRequests = () => {

    const [allRequests, setAllRequests] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/all-requests')
            .then(res => {
                setAllRequests(res.data);
            })
    }, [axiosInstance]);

    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Hospital Name</th>
                            <th>Blood Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allRequests.map((request, index) =>
                                <tr>
                                    <th>{(index + 1)}</th>
                                    <td>{request.recipient_name}</td>
                                    <td>{request.hospital_name}</td>
                                    <td>{request.blood_group}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRequests;