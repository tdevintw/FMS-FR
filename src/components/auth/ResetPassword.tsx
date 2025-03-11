import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await resetPassword(token, newPassword);
            setMessage('Your password has been reset successfully.');
        } catch (err) {
            console.error('Error in reset password:', err);
            setError('Failed to reset password. Please try again.');
        }
    };

    return (
        <form className="reset-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    minLength={8}
                    required
                />
            </div>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="reset-password-button">Reset Password</button>
        </form>
    );
};
