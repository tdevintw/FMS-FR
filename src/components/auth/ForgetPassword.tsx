import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await forgotPassword(email);
            setMessage('A password reset link has been sent to your email.');
        } catch (err) {
            console.error('Error in forgot password:', err);
            setError('Failed to send reset email. Please try again.');
        }
    };

    return (
        <form className="reset-password-form" onSubmit={handleSubmit}>

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
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="forget-password-button">
                Reset Password
            </button>

        </form>

);
};
