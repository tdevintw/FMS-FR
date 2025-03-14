import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


import "./App.css";
import HomePage from "./pages/HomePage.tsx";

import React from "react";





const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Routes>

                        <Route path="/" element={<HomePage />} />



                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                        <Route path="*" element={<h1>404 Not Found</h1>} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
