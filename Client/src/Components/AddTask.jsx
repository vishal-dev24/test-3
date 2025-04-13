import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ task: "", term: "", image: null });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("task", formData.task);
        data.append("term", formData.term);
        data.append("image", formData.image);
        await axios.post("http://localhost:4000/createTask", data, { withCredentials: true });
        setFormData({ task: "", term: "", image: null });
        navigate("/home");
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col items-center">

            {/* Navbar */}
            <nav className="bg-white shadow-lg w-full py-3 px-10 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-700">Add New Task</h1>
                <button onClick={() => navigate('/Home')} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:opacity-90 transition-all">Home</button>
            </nav>

            {/* Task Form */}
            <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-lg text-center mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-5">Create a Task</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" name="task" value={formData.task} onChange={handleChange} placeholder="Task Title" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <input name="term" value={formData.term} onChange={handleChange} placeholder="Task term" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
                    <input type="file" name="image" onChange={handleChange} required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <button type="submit" className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition-all">Add Task</button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;