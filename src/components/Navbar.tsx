import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Navbar.css';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img
                            src="https://i.ibb.co/WpkwR5Tm/image.png"
                            alt="Company Logo"
                            className="logo-image"
                        />
                    </Link>
                </div>

                <div className="navbar-links">
                    {!user ? (
                        <>
                            <Link to="/login" className="navbar-link">Login</Link>
                            <Link to="/register" className="navbar-link">Register</Link>
                        </>
                    ) : (
                        <>
                            <span className="navbar-user">
                                Welcome, {user.username} ({user.role})
                            </span>
                            <Link to="/profile" className="navbar-link">Profile</Link>
                            <button
                                onClick={handleLogout}
                                className="navbar-link logout-button"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;