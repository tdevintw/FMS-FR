import React, { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

interface ProfileFormData {
    username: string;
    currentPassword: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>({
        username: user?.username || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        // Validate input
        if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
            setError("New passwords do not match");
            return;
        }

            const updatePayload = {
                username: formData.username,
                ...(formData.newPassword ? { newPassword: formData.newPassword } : {}),
                currentPassword: formData.currentPassword
            };

            await axios.put('/api/user/profile', updatePayload, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setSuccessMessage("Profile updated successfully");
            setIsEditing(false);

    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (confirmDelete) {
                await axios.delete('/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                logout(); // Clear authentication and redirect to login

        }
    };

    return (
        <div className="profile-container">
            <h1>User Profile</h1>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <input
                        type="text"
                        value={user.role}
                        disabled
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="form-control"
                    />
                </div>

                {isEditing && (
                    <>
                        <div className="form-group">
                            <label>Current Password (Required to make changes)</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>New Password (Optional)</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmNewPassword"
                                value={formData.confirmNewPassword}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </>
                )}

                <div className="profile-actions">
                    {!isEditing ? (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </>
                    )}

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;