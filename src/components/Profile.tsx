import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

export const ProfileForm: React.FC = () => {
    const { user, updateUser, deleteUser } = useUser();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                password: '',
                role: user.role,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password.trim() && formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        try {
            await updateUser({ ...(formData.password && { password: formData.password }) });
            setSuccess('Profile updated successfully.');
        } catch (err) {
            setError('Failed to update profile. Please try again.');
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser();
            alert('Account deleted successfully.');
            window.location.href = '/login'; // Redirect to login after deletion
        } catch (err) {
            setError('Failed to delete account. Please try again.');
            console.error(err);
        }
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={formData.username} disabled />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} disabled />
            </div>

            <div className="form-group">
                <label htmlFor="role">Role</label>
                <input type="text" id="role" name="role" value={formData.role} disabled />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} placeholder="********" />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" className="profile-button">
                Update Profile
            </button>

            <button type="button" className="delete-button" onClick={() => setShowDeleteConfirm(true)}>
                Delete Account
            </button>

            {showDeleteConfirm && (
                <div className="delete-confirmation">
                    <p>Are you sure you want to delete your account?</p>
                    <button onClick={handleDelete} className="confirm-delete">Yes, Delete</button>
                    <button onClick={() => setShowDeleteConfirm(false)} className="cancel-delete">Cancel</button>
                </div>
            )}
        </form>
    );
};
