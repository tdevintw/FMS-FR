import React from 'react';
import {LoginForm} from '../../components/auth/Login';
import Navbar from "../../components/Navbar.tsx";
import '../../style/login.css';

const LoginPage: React.FC = () => {
    return (
        <div className="login-page">
            <Navbar/>

            <div className="login-page-container">
                <div className="login-container">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;