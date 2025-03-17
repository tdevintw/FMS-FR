
const FeatureCallouts = () => {
    return (
        <div className="call-to-action-area">
            <div className="container container-default custom-area">
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-custom">
                        <div className="call-to-action-item mt-0 d-lg-flex d-md-block align-items-center">
                            <div className="call-to-action-icon">
                                <img src="../src/assets/images/icons/icon-1.png" alt="Icon" />
                            </div>
                            <div className="call-to-action-info">
                                <h3 className="action-title">Streamlined Food Management</h3>
                                <p className="desc-content">Ensure smooth tracking and ordering of food supplies</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-custom">
                        <div className="call-to-action-item d-lg-flex d-md-block align-items-center">
                            <div className="call-to-action-icon">
                                <img src="../src/assets/images/icons/icon-2.png" alt="Icon" />
                            </div>
                            <div className="call-to-action-info">
                                <h3 className="action-title">Trusted Suppliers</h3>
                                <p className="desc-content">Partnering with the best food suppliers for premium quality ingredients</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-custom">
                        <div className="call-to-action-item d-lg-flex d-md-block align-items-center">
                            <div className="call-to-action-icon">
                                <img src="../src/assets/images/icons/icon-3.png" alt="Icon" />
                            </div>
                            <div className="call-to-action-info">
                                <h3 className="action-title">Real-Time Tracking</h3>
                                <p className="desc-content">Monitor food stock, supplier orders, and consumption in real-time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FeatureCallouts;