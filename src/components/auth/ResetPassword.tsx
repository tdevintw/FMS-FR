import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { useSearchParams } from "react-router-dom";

const ForgetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [token, setToken] = useState<string | null>(null);

    const { resetPassword } = useAuth();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        if (!tokenFromUrl) {
            setError("Invalid reset link. Token is missing.");
        } else {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    const validatePassword = (password: string): string => {
        if (!password) return 'Password is required.';
        if (password.length < 8) return 'Password must be at least 8 characters long.';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
        if (!/[0-9]/.test(password)) return 'Password must contain at least one digit.';
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!token) {
            setError("Token is missing. Please check the reset link.");
            return;
        }

        const validationError = validatePassword(newPassword);
        if (validationError) {
            setPasswordError(validationError);
            return;
        }

        try {
            await resetPassword(token, newPassword);
            setMessage("Password has been reset successfully.");
            setNewPassword("");
        } catch (err) {
            console.error("Error in reset password:", err);
            setError("Failed to reset password. Please try again.");
        }
    };

    if (error) {
        return <div style={{fontSize : '3rem' , marginBottom : '3rem' , marginTop : '3rem' , textAlign : 'center'}} className="error-message">{error}</div>;
    }

    return (
        <div className="login-register-area mt-no-text mb-no-text">
            <div className="container container-default-2 custom-area">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-custom">
                        <div className="login-register-wrapper">
                            <div className="section-content text-center mb-5">
                                <h2 className="title-4 mb-2">Reset Password</h2>
                                <p className="desc-content">Enter Your New Password.</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="single-input-item mb-3">
                                    <input
                                        type="password"
                                        placeholder="********"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                {message && <div style={{marginBottom : '1rem'}} className="success-message">{message}</div>}
                                {error && <div className="error-message">{error}</div>}
                                {passwordError && <div className="error-message">{passwordError}</div>}

                                <div className="single-input-item mb-3 d-flex justify-content-center">
                                    <button type="submit" className="btn obrien-button-2 primary-color">
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
