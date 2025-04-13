import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import Home from './Components/Home.jsx'
import AddTask from './Components/AddTask.jsx'
import Update from './Components/Update.jsx'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/addTask" element={<AddTask />} />
                <Route path="/update/:id" element={<Update />} />
            </Routes>
        </Router>

    )
}

export default App