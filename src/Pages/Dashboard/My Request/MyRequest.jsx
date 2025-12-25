import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyRequest = () => {

    const [myRequests, setMyRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1)

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                setMyRequests(res.data.request)
                setTotalRequest(res.data.totalRequest)
            })
    }, [axiosSecure, currentPage, itemsPerPage])

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1)

    // console.log(myRequests)
    // console.log(totalRequest)
    // console.log(numberOfPages)
    console.log(pages)

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
                            myRequests.map((request, index) =>
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{request.recipient_name}</td>
                                    <td>{request.hospital_name}</td>
                                    <td>{request.blood_group}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn">Prev</button>
                {
                    pages.map(page=>
                        <button>
                            {page}
                        </button>
                    )
                }
                <button className="btn">Next</button>
            </div>
        </div>
    );
};

export default MyRequest;