import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!username) {
            setError('Please enter a username');
            return;
        }
        if (!email) {
            setError('Please enter a valid email');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Email is not valid');
            return;
        }

        if (!password) {
            setError('Please enter a password');
            return;
        }

        if (!role) {
            setError('Please select a role');
            return;
        }

        if (!(role === "MANAGER") && !(role === "SUPPLIER") && !(role === "SHIPPER")) {
            setError('Select a valid role');
            return;
        }
        try {
            await register(username, email, password, role);
            navigate("/login");
        } catch (err) {
            if (isAxiosError(err)) {
                if (err.response && err.response.status === 400) {
                    const errorMessage = typeof err.response.data === 'string' ? err.response.data : 'Registration failed. Please try again.';
                    setError(errorMessage);
                } else {
                    setError('Registration failed. Please try again.');
                }
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error(err);
        }
    };

    function isAxiosError(error: unknown): error is import('axios').AxiosError {
        return (error as import('axios').AxiosError).isAxiosError !== undefined;
    }


    return (
        <div className="login-register-area mt-no-text mb-no-text">
            <div className="container container-default-2 custom-area">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-custom">
                        <div className="login-register-wrapper">
                            <div className="section-content text-center mb-5">
                                <h2 className="title-4 mb-2">Create Account</h2>
                                <p className="desc-content">Please Register using account details below.</p>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className="single-input-item mb-3">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="single-input-item mb-3">
                                    <input
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="single-input-item mb-3">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        minLength={8}
                                    />
                                </div>

                                <div className="single-input-item mb-3">
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                    <div className="single-input-item mb-3">
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc',
                                                backgroundColor: '#fff',
                                                fontSize: '16px',
                                                color: '#333',
                                                transition: 'border-color 0.3s ease',
                                            }}
                                        >
                                            <option value="">Select a Role</option>
                                            <option value="MANAGER">Manager</option>
                                            <option value="SUPPLIER">Supplier</option>
                                            <option value="SHIPPER">Shipper</option>
                                        </select>
                                    </div>
                                {error && <div style={{ marginBottom : '1rem'}} className="error-message">{error}</div>}

                                <div className="single-input-item mb-3 d-flex justify-content-center">
                                    <button type="submit" className="btn obrien-button-2 primary-color">
                                        Register
                                    </button>
                                </div>
                                <div className="single-input-item float-end">
                                    <Link to="/login">Having Account ?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
