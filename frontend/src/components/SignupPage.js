import { useState } from 'react'
import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [add, setAdd] = useState(null);
    const [phone, setPhone] = useState(null);
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/register', { name, pwd, add, phone });
            console.log(response.data);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setName(null);
                setPwd(null);
                setAdd(null);
                setPhone(null);
                toast.success('Register Successful!');
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input type="text" className="w-full p-2 border rounded" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input type="password" className="w-full p-2 border rounded" onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Address</label>
                        <input type="text" className="w-full p-2 border rounded" onChange={(e) => setAdd(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" className="w-full p-2 border rounded" onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={(e) => registerUser(e)}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
