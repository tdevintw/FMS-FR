import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import pages
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';

// Optional: Import global styles
import './App.css';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />




                        <Route
                            path="/"
                            element={<Navigate to="/dashboard" replace />}
                        />

                        {/* 404 Not Found */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;