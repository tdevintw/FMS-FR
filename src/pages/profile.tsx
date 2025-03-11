import React from 'react';
import Profile from "../components/Profile.tsx";
import Navbar from "../components/Navbar";
import '../style/profile.css'
const ProfilePage: React.FC = () => {
    return (
        <div className="login-page">
            <Navbar/>

            <div className="login-page-container">
                <div className="login-container">
                    <Profile/>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;