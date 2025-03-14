
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
                                <h3 className="action-title">Free Home Delivery</h3>
                                <p className="desc-content">Provide free home delivery for all product over $100</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-custom">
                        <div className="call-to-action-item d-lg-flex d-md-block align-items-center">
                            <div className="call-to-action-icon">
                                <img src="../src/assets/images/icons/icon-2.png" alt="Icon" />
                            </div>
                            <div className="call-to-action-info">
                                <h3 className="action-title">Quality Products</h3>
                                <p className="desc-content">We ensure our product quality all times</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-custom">
                        <div className="call-to-action-item d-lg-flex d-md-block align-items-center">
                            <div className="call-to-action-icon">
                                <img src="../src/assets/images/icons/icon-3.png" alt="Icon" />
                            </div>
                            <div className="call-to-action-info">
                                <h3 className="action-title">Online Support</h3>
                                <p className="desc-content">To satisfy our customer we try to give support online</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FeatureCallouts;