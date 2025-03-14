import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


import "./App.css";
import HomePage from "./pages/HomePage.tsx";

import React from "react";
import LoginPage from "./pages/auth/LoginPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage.tsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.tsx";





const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Routes>

                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forget-password" element={<ForgetPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />

                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
