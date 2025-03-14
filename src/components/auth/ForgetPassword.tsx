
const ForgetPassword = () => {


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
                            <form>
                                <div className="single-input-item mb-3  ">
                                    <input
                                        type="email"
                                        placeholder="Email "
                                    />
                                </div>
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
