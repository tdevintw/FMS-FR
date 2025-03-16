import React, {useState, useEffect} from 'react';
import {useUser} from '../../context/UserContext.tsx';

const ProfileAccount = () => {
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
        const password = formData.password.trim();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (password && password.length < 8) {
            setError('Password must be at least 8 characters long.');
        } else if (password && !passwordRegex.test(password)) {
            setError('Password must contain at least one lowercase letter, one uppercase letter, and one digit.');
        }
        else if(password) {
            try {
                await updateUser({...(formData.password && {password: formData.password})});
                setSuccess('Profile updated successfully.');
            } catch (err) {
                setError('Updating failed. Please try again.');
                console.error(err);

            }
        }
    };

    return (
        <div className="tab-pane" id="account-info" role="tabpanel">
            <div className="myaccount-content">
                <h3>Account Details</h3>
                <div className="account-details-form">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-custom">
                                <div className="single-input-item mb-3">
                                    <label htmlFor="username" className="required mb-1">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-custom">
                                <div className="single-input-item mb-3">
                                    <label htmlFor="email" className="required mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="single-input-item mb-3">
                            <label htmlFor="role" className="required mb-1">Role</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="single-input-item mb-3">
                            <label htmlFor="password" className="required mb-1">New Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter a new password"
                            />
                        </div>

                        {error && <div style={{marginBottom: '1rem'}} className="error-message">{error}</div>}
                        {success && <div style={{marginBottom: '1rem'}} className="success-message">{success}</div>}

                        <div className="single-input-item single-item-button">
                            <button type="submit" className="btn obrien-button primary-btn">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileAccount;
