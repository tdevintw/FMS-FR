import React, {JSX} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import LoginPage from "./pages/auth/Login.tsx";
import RegisterPage from "./pages/auth/Register.tsx";
import ProfilePage from "./pages/profile.tsx";
import ForgetPasswordPage from "./pages/auth/ForgetPassword.tsx";
import "./App.css";
import ResetPasswordPage from "./pages/auth/ResetPassword.tsx";

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
                        {/* Public Routes (Restricted when logged in) */}
                        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                        <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />
                        <Route path="/forget-password" element={<PublicRoute element={<ForgetPasswordPage />} />} />
                        <Route path="/reset-password/:token" element={<PublicRoute element={<ResetPasswordPage />} />} />

                        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />

                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                        <Route path="*" element={<h1>404 Not Found</h1>} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
