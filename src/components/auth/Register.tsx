import  { useState } from 'react';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subscribe, setSubscribe] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    return (
        <div className="login-register-area mt-no-text mb-no-text">
            <div className="container container-default-2 custom-area">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-custom">
                        <div className="login-register-wrapper">
                            <div className="section-content text-center mb-5">
                                <h2 className="title-4 mb-2">Create Account</h2>
                                <p className="desc-content">Please Register using account details below.</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="single-input-item mb-3">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="single-input-item mb-3">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="single-input-item mb-3">
                                    <input
                                        type="email"
                                        placeholder="Email or Username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="single-input-item mb-3">
                                    <input
                                        type="password"
                                        placeholder="Enter your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="single-input-item mb-3">
                                    <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                                        <div className="remember-meta mb-3">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id="rememberMe"
                                                    checked={subscribe}
                                                    onChange={() => setSubscribe(!subscribe)}
                                                />
                                                <label className="custom-control-label" htmlFor="rememberMe">
                                                    Subscribe to Our Newsletter
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-input-item mb-3">
                                    <button type="submit" className="btn obrien-button-2 primary-color">
                                        Register
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

export default Register;
