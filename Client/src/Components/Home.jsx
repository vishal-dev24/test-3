import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:4000/profile', { withCredentials: true });
      setUser(res.data);
    } catch (error) {
      setUser(null);
      navigate('/login');
    }
  };

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:4000/getAllTasks', { withCredentials: true })
    setTasks(response.data);
  }

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  const handleLogout = async () => {
    await axios.get('http://localhost:4000/logout', { withCredentials: true });
    navigate('/login');
  };

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:4000/deleteTask/${taskId}`, { withCredentials: true });
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex flex-col items-center">
      <nav className="bg-white shadow-lg w-full py-3 px-10 flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-700">My Profile</h1>
        <div className='space-x-4 flex items-center'>
          <button onClick={() => navigate('/AddTask')} className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:opacity-90 transition-all">Addtask</button>
          <button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:opacity-90 transition-all">Logout</button>
        </div>
      </nav>
      {/* Profile Card */}
      <div className="bg-white py-2 rounded-3xl shadow-xl w-full max-w-md text-center mt-3">
        {user && (
          <>
            <div className="relative inline-block">
              <img src={`http://localhost:4000/uploads/${user.image}`} alt="User" className="w-36 h-36 mx-auto rounded-xl shadow- border-4 border-blue-300" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800 mt-3">{user.username}</h1>
            <h2 className="text-gray-700 text-lg mb-2">{user.email}</h2>

          </>
        )}
      </div>
      {/* TASk TABLE */}
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="table-auto min-w-full border-collapse bg-white shadow-lg">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-2 py-2 text-sm sm:text-lg font-bold uppercase">Task Name</th>
                <th className="px-2 py-2 text-sm sm:text-lg font-bold uppercase">Status</th>
                <th className="px-2 py-2 text-sm sm:text-lg font-bold uppercase">Image</th>
                <th className="px-2 py-2 text-sm sm:text-lg font-bold uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-100">
                  <td className="border p-2 text-lg sm:text-md font-semibold text-gray-800">{task.task}</td>
                  <td className="border p-2 text-lg sm:text-md font-semibold text-gray-800">{task.term}</td>
                  <td className="border p-3">
                    <div className="w-16 h-16 flex justify-center items-center mx-auto">
                      <img src={`http://localhost:4000/uploads/${task.image}`} alt="Task" className="w-full h-full object-cover rounded-md border-2 border-teal-700" />
                    </div>
                  </td>
                  <td className="border px-3 py-3 space-x-4">
                    <button onClick={() => handleDeleteTask(task._id)} className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-md sm:text-md px-2 sm:px-4 py-1 sm:py-2 rounded-md font-semibold shadow-md hover:opacity-90 transition-all"> Delete</button>
                    <button onClick={() => navigate(`/update/${task._id}`)} className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-md sm:text-md px-2 sm:px-4 py-1 sm:py-2 rounded-md font-semibold shadow-md hover:opacity-90 transition-all">                  Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Home;