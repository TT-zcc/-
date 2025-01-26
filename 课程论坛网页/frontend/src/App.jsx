import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import './index.css';
import Register from './Register';
import Dashboard from './Dashboard';
import ParticularPresentation from './ParticularPresentation';

function App () {
  useClearToken(['/', '/register']);

  // Define routes and corresponding components
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/presentation/:id" element={<ParticularPresentation />} />
    </Routes>
  );
}

function useClearToken (paths) {
  const location = useLocation();

  useEffect(() => {
    // Remove the token from local storage if current path is in the specified list
    if (paths.includes(location.pathname)) {
      localStorage.removeItem('token');
    }
  }, [location.pathname, paths]); // Dependency array for the useEffect hook
}

export default App; // Export the App component as default
