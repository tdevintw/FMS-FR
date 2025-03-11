import React from 'react';
import {ProfileForm} from "../components/Profile";
import Navbar from "../components/Navbar";
import '../style/profile.css'

const ProfilePage: React.FC = () => {
    return (
        <div className="login-page">
            <Navbar/>

            <div className="login-page-container">
                <div className="login-container">
                    <ProfileForm/>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;