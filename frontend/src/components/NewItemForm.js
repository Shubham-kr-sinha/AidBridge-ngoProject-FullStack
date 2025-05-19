import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewItemFormPage = () => {
    const { type } = useParams();
    const [qualityStatus, setQualityStatus] = useState('');
    const [desc, setDesc] = useState('');
    const id = JSON.parse(sessionStorage.getItem('donor'))?.donor_id;
    const [donorId, setDonorId] = useState(id);
    const [branchId, setBranchId] = useState('');
    const [dateReceived, setDateReceived] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Create the item
            const itemResponse = await axios.post('/items', {
                type,
                quality_status: qualityStatus,
                desc,
            });

            console.log(itemResponse);
            const itemId = itemResponse.data.item_id; // Assuming the response includes the created item's ID

            // Step 2: Create the donation
            const donationResponse = await axios.post('/donations', {
                donor_id: donorId,
                item_id: itemId,
                date_received: dateReceived,
                branch_id: branchId,
            });
            console.log(donationResponse);
            setResponseMessage(`Donation created successfully: ${JSON.stringify(donationResponse.data)}`);
            setQualityStatus('');
            setDesc('');
            setDonorId('');
            setBranchId('');
            setDateReceived('');
        } catch (err) {
            setResponseMessage(`Error: ${err.response ? err.response.data.message : 'Request failed'}`);
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Donate {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-4 border rounded shadow">

                {/* Quality Status */}
                <div>
                    <label htmlFor="qualityStatus" className="block font-bold">Quality Status</label>
                    <select
                        id="qualityStatus"
                        value={qualityStatus}
                        onChange={(e) => setQualityStatus(e.target.value)}
                        required
                        className="border p-2 w-full"
                    >
                        <option value="" disabled>Select quality status</option>
                        <option value="perfect">Perfect</option>
                        <option value="good">Good</option>
                        <option value="okay">Okay</option>
                        <option value="needs_repair">Needs Repair/Can be recycled</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="desc" className="block font-bold">Description</label>
                    <textarea
                        id="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                {/* Donor ID */}
                <div>
                    <label htmlFor="donorId" className="block font-bold">Donor ID</label>
                    <input
                        type="number"
                        id="donorId"
                        value={donorId}
                        onChange={(e) => setDonorId(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>

                {/* Branch ID */}
                <div>
                    <label htmlFor="branchId" className="block font-bold">Branch ID</label>
                    <input
                        type="number"
                        id="branchId"
                        value={branchId}
                        onChange={(e) => setBranchId(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>

                {/* Date Received */}
                <div>
                    <label htmlFor="dateReceived" className="block font-bold">Date Received</label>
                    <input
                        type="date"
                        id="dateReceived"
                        value={dateReceived}
                        onChange={(e) => setDateReceived(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>

                <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">
                    Submit Donation
                </button>
            </form>

            {responseMessage && <p className="mt-4">{responseMessage}</p>}
        </div>
    );
};

export default NewItemFormPage;
