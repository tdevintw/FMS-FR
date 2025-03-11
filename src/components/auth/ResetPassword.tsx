import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface ResetPasswordFormProps {
    token: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { resetPassword } = useAuth();

    const validatePassword = (password: string): string => {
        if (!password) {
            return 'Password is required.';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one digit.';
        }
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const validationError = validatePassword(newPassword);
        if (validationError) {
            setPasswordError(validationError);
            return;
        }

        try {
            await resetPassword(token, newPassword);
            setMessage('Password has been reset successfully.');
            setNewPassword('');
        } catch (err) {
            console.error('Error in reset password:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to reset password. Please try again.');
            }
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
                    onChange={(e) => {
                        setNewPassword(e.target.value);
                        setPasswordError(validatePassword(e.target.value)); // Real-time validation
                    }}
                    placeholder="Enter new password"
                    minLength={8}
                    required
                />
                {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="reset-password-button">Reset Password</button>
        </form>
    );
};
