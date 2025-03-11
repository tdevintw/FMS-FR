import React from 'react';
import {ForgotPasswordForm} from '../../components/auth/ForgetPassword.tsx';
import Navbar from "../../components/Navbar";
import '../../style/forgetPassword.css';

const ForgetPasswordPage: React.FC = () => {
    return (
        <div className="forget-password-page">
            <Navbar/>

            <div className="forget-password-page-container">
                <div className="forget-password-container">
                    <ForgotPasswordForm/>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;