import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/Register';
import Navbar from '../../components/Navbar';
import '../../style/register.css';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRegistrationSuccess = () => {
        navigate('/login');
    };

    return (
        <div className="register-page">
            <Navbar />
            <div className="register-page-container">
            <div className="register-container">
                <h1>Create an Account</h1>
                <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
            </div>
            </div>
        </div>
    );
};

export default RegisterPage;