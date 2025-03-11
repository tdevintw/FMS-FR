import React from 'react';
import {ForgotPasswordForm} from '../../components/auth/forgetPassword';
import Navbar from "../../components/Navbar";
import '../../style/forgetPassword.css';

const ForgetPasswordPage: React.FC = () => {
    return (
        <div className="forgot-password-page">
            <Navbar/>

            <div className="forgot-password-page-container">
                <div className="forgot-password-container">
                    <ForgotPasswordForm/>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;