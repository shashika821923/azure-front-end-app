import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";
import Login from './login/login.page';
import Dashboard from './dashboard/dashboard.page';


const App = () => {
    const isAuthenticated = useIsAuthenticated();
    // useEffect(() => {
    //      window.location.href = '/dashboard';
    // }, [isAuthenticated])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
