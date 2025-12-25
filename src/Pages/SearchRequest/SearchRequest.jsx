import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

const SearchRequest = () => {

    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')
    const [search, setSearch] = useState([])
    const axiosInstance = useAxios()

    useEffect(() => {
        axios.get('./upazila.json')
            .then(res => {
                setUpazilas(res.data.upazilas)
            })

        axios.get('./district.json')
            .then(res => {
                setDistricts(res.data.districts)
            })

    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.blood.value;

        axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setSearch(res.data)
            })
    }
    console.log(search)
    return (
        <div className='flex flex-col items-center bg-red-50 h-screen'>
            <div>
                <form onSubmit={handleSearch} action="" className='fieldset flex'>
                    <div>
                        <label className="label">Blood Group</label>
                        <select name='blood' defaultValue="Choose Blood Group" className="select">
                            <option value="" disabled selected>Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A−</option>
                            <option value="B+">B+</option>
                            <option value="B-">B−</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB−</option>
                            <option value="O+">O+</option>
                            <option value="O-">O−</option>
                        </select>
                    </div>

                    <div>
                        <label className="label">District</label>
                        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="select">
                            <option disabled selected value="">Select Your District</option>
                            {
                                districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                            }
                        </select>
                    </div>

                    <div>
                        <label className="label">Upazila</label>
                        <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="select">
                            <option disabled selected value="">Select Your Upazila</option>
                            {
                                upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
                            }
                        </select>
                    </div>
                    <button className="btn mt-[18px]">Search</button>
                </form>
            </div>
            <div className='grid grid-cols-3 my-24 gap-10'>
                {
                    search.map(s =>
                        <div className='bg-red-200 rounded-xl p-5'>
                            <h1 className='text-xl my-1'>Name: <span className='font-bold'>{s.recipient_name}</span></h1>
                            <h1 className='text-xl my-1'>Blood Group: <span className='font-bold text-red-500'>{s.blood_group}</span></h1>
                            <h1 className='text-xl my-1'>District: <span className='font-bold'>{s.recipient_district}</span></h1>
                            <h1 className='text-xl my-1'>Upazila: <span className='font-bold'>{s.recipient_upazila}</span></h1>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default SearchRequest;