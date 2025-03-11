import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { ResetPasswordForm } from '../../components/auth/ResetPassword';
import Navbar from "../../components/Navbar";
import '../../style/resetPassword.css';

const ResetPasswordPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token'); // Extract token from query parameters

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
