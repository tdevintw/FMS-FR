import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate} from 'react-router-dom';

export const LoginForm: React.FC = () => {
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
            navigate('/dashboard');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Your Username"
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    placeholder="Enter Your Password"
                />
            </div>
            <button type="submit" className="login-button">
                Login
            </button>
            <p>
                Don't have an account? <a className={"register-redirect"} href="/register">Register</a>
            </p>
            <p className={"forgot-password-p"}>
                 <a className={ "forgot-password"} href="/register"> Forgot  Password ?</a>
            </p>
        </form>
    );
};