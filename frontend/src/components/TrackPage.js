import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const TrackPage = () => {
    const [id, setid] = useState();
    const [donation, setDonation] = useState([]);

    const handleDonation = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.get(`/donations/${id}`);
            if (response.data.error) {
                toast.error(response.data.error);
            }
            console.log(response.data);
            setDonation(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Track Your Donation</h2>
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Donation ID</label>
                        <input type="text" className="w-full p-2 border rounded" placeholder="Enter your donation ID" value={id} onChange={(e) => setid(e.target.value)} />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={(e) => handleDonation(e)}>
                        Track Donation
                    </button>
                </form>

                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Recent Donations</h3>
                    <div className="space-y-4">
                        {/* {[1, 2, 3].map((i) => (
                            <div key={i} className="border rounded p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">Donation #{i}</p>
                                        <p className="text-gray-600">Type: Money</p>
                                    </div>
                                    <span className="text-green-600">Delivered</span>
                                </div>
                            </div>
                        ))} */}


                        {donation?.Donor?.name && (
                            <div key={donation.donation_id} className="border rounded p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">Donation #{donation.donation_id}</p>
                                        <p className=""> {donation.Item.desc}</p>
                                        <p className="text-gray-600">Type: {donation.Item.type}</p>
                                    </div>
                                    <span className="text-green-600">{donation.date_received}</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackPage
