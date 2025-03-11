import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the token from URL
import { ResetPasswordForm } from '../../components/auth/ResetPassword';
import Navbar from "../../components/Navbar";
import '../../style/resetPassword.css';

const ResetPasswordPage: React.FC = () => {
    const { token } = useParams<{ token: string }>(); // Extract token from URL

    if (!token) {
        return <div className="error-message">Invalid or missing reset password token.</div>;
    }

    return (
        <div className="reset-password-page">
            <Navbar/>
            <div className="reset-password-page-container">
                <div className="reset-password-container">
                    <ResetPasswordForm token={token} /> {/* Pass the token to the form */}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
