const ProfileAccount = () => {
    return (
        <div className="tab-pane " id="account-info" role="tabpanel">
            <div className="myaccount-content">
                <h3>Account Details</h3>
                <div className="account-details-form">
                    <form action="#">
                        <div className="row">
                            <div className="col-lg-6 col-custom">
                                <div className="single-input-item mb-3">
                                    <label htmlFor="first-name" className="required mb-1">First Name</label>
                                    <input type="text" id="first-name" placeholder="First Name"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-custom">
                                <div className="single-input-item mb-3">
                                    <label htmlFor="last-name" className="required mb-1">Last Name</label>
                                    <input type="text" id="last-name" placeholder="Last Name"/>
                                </div>
                            </div>
                        </div>
                        <div className="single-input-item mb-3">
                            <label htmlFor="display-name" className="required mb-1">Display Name</label>
                            <input type="text" id="display-name" placeholder="Display Name"/>
                        </div>
                        <div className="single-input-item mb-3">
                            <label htmlFor="email" className="required mb-1">Email Addres</label>
                            <input type="email" id="email" placeholder="Email Address"/>
                        </div>
                        <fieldset>
                            <legend>Password change</legend>
                            <div className="single-input-item mb-3">
                                <label htmlFor="current-pwd" className="required mb-1">Current Password</label>
                                <input type="password" id="current-pwd" placeholder="Current Password"/>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-custom">
                                    <div className="single-input-item mb-3">
                                        <label htmlFor="new-pwd" className="required mb-1">New Password</label>
                                        <input type="password" id="new-pwd" placeholder="New Password"/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-custom">
                                    <div className="single-input-item mb-3">
                                        <label htmlFor="confirm-pwd" className="required mb-1">Confirm Password</label>
                                        <input type="password" id="confirm-pwd" placeholder="Confirm Password"/>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="single-input-item single-item-button">
                            <button className="btn obrien-button primary-btn">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileAccount;