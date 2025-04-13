import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ task: "", term: "", image: null });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/getTask/${id}`)
            .then(({ data }) => setFormData({ task: data.task, term: data.term, image: data.image || null }));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("task", formData.task);
        data.append("term", formData.term);
        data.append("image", formData.image);
        await axios.put(`http://localhost:4000/updateTask/${id}`, data);
        navigate("/home");
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-200 to-purple-200">
            <nav className="bg-white shadow-lg w-full py-3 px-10 flex justify-between">
                <h1 className="text-lg font-bold">My Profile</h1>
                <button onClick={() => navigate('/home')} className="bg-blue-500 text-white px-4 py-2 rounded">Home</button>
            </nav>
            <div className="bg-white mt-16 p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Update Task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="task" value={formData.task} onChange={handleChange} className="w-full p-2 border rounded mb-4" required placeholder="Task Name" />
                    <input type="text" name="term" value={formData.term} onChange={handleChange} className="w-full p-2 border rounded mb-4" required placeholder="Status" />
                    <img src={`http://localhost:4000/uploads/${formData.image}`} className="w-32 h-32 object-cover rounded mb-4" />
                    <input type="file" name="image" onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePage;