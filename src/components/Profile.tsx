import React, {useState, useEffect} from 'react';
import {useUser} from '../context/UserContext';

export const ProfileForm: React.FC = () => {
    const {user, updateUser} = useUser();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await updateUser({
                username: formData.username,
                ...(formData.password && {password: formData.password}), // Only include password if it's not empty
            });

            setSuccess('Profile updated successfully.');
        } catch (err) {
            setError('Failed to update profile. Please try again.');
            console.error(err);
        }
    };
    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                />
            </div>

            <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    disabled
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                />
            </div>

            <button type="submit" className="profile-button">
                Update Profile
            </button>
        </form>
    );
};
