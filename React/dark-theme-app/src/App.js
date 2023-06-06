import React, { useContext, useState } from 'react';
import './App.css';
import { ThemeContext, themes } from './ThemeContext';

function Dashboard() {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <ThemeContext.Provider value={theme}>
        <Content />
      </ThemeContext.Provider>
    </div>
  );
}

function Content() {
  const theme = useContext(ThemeContext)
  return (
        <div className={`content ${theme.name}`}>
          <h2>Content Area</h2>
          <p>This is the content area of the dashboard.</p>
        </div>
  );
}

function App() {
  return (
    <div className="app">
      <Dashboard />
    </div>
  );
}

export default App;
