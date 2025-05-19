import { useState } from 'react'
import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [name, setName] = useState(null);
    const [pwd, setPwd] = useState(null);
    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/auth/login", { name, pwd })
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setName(null);
                setPwd(null);
                toast.success('Login Successful!');
                sessionStorage.setItem('donor', JSON.stringify(response.data));
                navigate('/profile');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input type="text" className="w-full p-2 border rounded" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input type="password" className="w-full p-2 border rounded" onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={(e) => loginUser(e)}>
                        Log In
                    </button>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={() => navigate('/signup')}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
