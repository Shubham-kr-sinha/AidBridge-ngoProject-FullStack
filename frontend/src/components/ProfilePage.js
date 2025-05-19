import { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [donor, setDonor] = useState();
    
    useEffect(() => {
        // Fetch the donor data when the component mounts
        const fetchDonorData = async () => {
            try {
                // Replace with your actual API endpoint
                setDonor(JSON.parse(sessionStorage.getItem('donor')));                
            } catch (error) {
                console.error('Error fetching donor data:', error);
            }
        };

        fetchDonorData();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">My Profile</h2>
            {donor && (
                <div className="bg-white shadow-md rounded-lg p-4">
                    <p><strong>Name:</strong> {donor.name}</p>
                    <p><strong>Donor ID:</strong> {donor.donor_id}</p>
                    <p><strong>Address:</strong> {donor.address}</p>
                    <p><strong>Phone Number:</strong> {donor.phone_num}</p>
                </div>)
            }
        </div>
    );
};

export default ProfilePage;
