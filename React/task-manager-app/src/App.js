// Import required libraries
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TaskManager from './TaskManager';

const App = () => {
 
  return (
    <div>
            <h1>Task Manager</h1>
  
    <Router>
      <TaskManager/>
    </Router>
      </div>
  );
};

export default App;

