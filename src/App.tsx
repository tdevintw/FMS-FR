import React, {JSX} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import pages
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ProfilePage from "./pages/profile.tsx";

// Optional: Import global styles
import "./App.css";

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

                        {/* Protected Routes (Only accessible when authenticated) */}
                        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />

                        {/* Redirect "/" to dashboard */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                        {/* 404 Not Found */}
                        <Route path="*" element={<h1>404 Not Found</h1>} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
