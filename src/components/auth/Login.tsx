import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(username, password);
            navigate('/profile');
        } catch (err) {
            if (isAxiosError(err)) {
                if (err.response && err.response.status === 400) {
                    const errorMessage = typeof err.response.data === 'string' ? err.response.data : 'Login failed. Please try again.';
                    setError(errorMessage);
                } else {
                    setError('Login failed. Please try again.');
                }
            } else {
                setError('Login failed. Please try again.');
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
                                <h2 className="title-4 mb-2">Login</h2>
                                <p className="desc-content">Please login using account details below.</p>
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
                                        type="password"
                                        placeholder="Enter your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <div style={{marginBottom : '1rem'}} className="error-message">{error}</div>}
                                <div className="single-input-item mb-3 d-flex justify-content-center">
                                    <button type="submit" className="btn obrien-button-2 primary-color">
                                        Login
                                    </button>
                                </div>

                                <div className="single-input-item d-flex justify-content-between">
                                    <Link to="/forget-password">Forgot Password ?</Link>
                                    <Link to="/register">Create Account</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
