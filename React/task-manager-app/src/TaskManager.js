
import React, { useState } from 'react';
import { Route, Link, useNavigate, Routes } from 'react-router-dom';

const TaskManager = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'eve.holt@reqres.in', password: 'cityslicka' }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        navigate('/dashboard');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  };

  const createTask = () => {
    if(newTask === '') return
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  if (!loggedIn) {
    return (
      <div>
        <h1>Please log in</h1>
        <button onClick={handleLogin}>Log in</button>
      </div>
    );
  }
  return (
      <Routes>
        <Route path="/dashboard" element={<div>
              <h2>Task Dashboard</h2>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={createTask}>Create Task</button>
              <button onClick={handleLogout}>Log out</button>
            </div>}>
        </Route>
      </Routes>
  );
};

export default TaskManager;
