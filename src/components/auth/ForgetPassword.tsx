import React, {useState} from "react";
import {useAuth} from "../../context/AuthContext.tsx";

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const {forgotPassword} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            setError("Email is required ! ");
            return
        }
        if (!emailRegex.test(email)) {
            setError('Email is not valid');
            return;
        }

        try {
            await forgotPassword(email);
            setMessage('A password reset link has been sent to your email.');
        } catch (err) {
            console.error('Error in forgot password:', err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to send reset email. Please try again.');
            }
        }
    };


    return (
        <div className="login-register-area mt-no-text mb-no-text">
            <div className="container container-default-2 custom-area">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-custom">
                        <div className="login-register-wrapper">
                            <div className="section-content text-center mb-5">
                                <h2 className="title-4 mb-2">Forget Password</h2>
                                <p className="desc-content">Please Enter Your Email .</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="single-input-item mb-3  ">
                                    <input
                                        placeholder="Email "
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {message && <div style={{marginBottom : '1rem'}} className="success-message">{message}</div>}
                                {error && <div className="error-message">{error}</div>}

                                <div className="single-input-item mb-3 d-flex justify-content-center">
                                    <button type="submit" className="btn obrien-button-2 primary-color ">
                                        Send
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
