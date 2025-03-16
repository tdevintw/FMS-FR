import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

import "./App.css";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage.tsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const PublicRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/profile" replace /> : element;
};

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                        <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />
                        <Route path="/forget-password" element={<PublicRoute element={<ForgetPasswordPage />} />} />
                        <Route path="/reset-password" element={<PublicRoute element={<ResetPasswordPage />} />} />

                        <Route path="/profile" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <ProfilePage />
                                </UserProvider>
                            } />
                        } />

                        <Route path="/" element={<HomePage />} />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;