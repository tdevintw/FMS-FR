import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { forgotPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            await forgotPassword(email);
            setMessage('If an account with this email exists, you will receive a password reset link.');
        } catch (err) {
            setError('Failed to reset password. Please try again.');
            console.error(err);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    required
                />
            </div>
            <button type="submit" className="login-button">
                Reset Password
            </button>
            <p>
                Remembered your password? <a className="register-redirect" href="/login">Login</a>
            </p>
        </form>
    );
};
