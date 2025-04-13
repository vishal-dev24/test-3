import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/login', formData, { withCredentials: true });
        setFormData({ username: '', email: '' });
        navigate('/home');
    }

    return (
        <div className="flex justify-center items-center flex-col min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
            <h1 className='font-bold  text-3xl mb-3 text-slate-800'>WelCome To TaskiFy</h1>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[{ type: "email", name: "email", placeholder: "Enter email" }, { type: "password", name: "password", placeholder: "Enter password" }].map((input, index) => (
                        <input key={index} {...input} value={formData[input.name]} onChange={handleChange} required className="w-full p-3 border border-sky-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    ))}
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-200 transition">Login</button>
                </form>
                <p className="text-center text-gray-600 mt-4">Don't have an account? <Link to="/" className="text-blue-600 hover:underline">Register here</Link></p>
            </div>
        </div>
    )
}
export default Login