import {Link} from "react-router-dom";

const FlashDeal = () => {
    return (
        <div className="banner-fullwidth-area ">
            <div className="container custom-area">
                <div className="row">
                    <div className="col-md-5 col-lg-6 text-center col-custom">
                        <div className="banner-thumb h-100 d-flex justify-content-center align-items-center">
                            <img src="../src/assets/images/banner/thumb/1.png" alt="Banner Thumb" />
                        </div>
                    </div>
                    <div className="col-md-7 col-lg-6 text-center justify-content-center col-custom">
                        <div className="banner-flash-content d-flex flex-column align-items-center justify-content-center h-100">
                            <h2 className="deal-head text-uppercase">Smart Inventory Alerts</h2>
                            <h3 className="deal-title text-uppercase">Avoid food shortages and excess stock with automated alerts.</h3>
                            <Link to={"/login"} className="obrien-button primary-btn">Get Started Now</Link>
                            <div className="countdown-wrapper d-flex justify-content-center" data-countdown="2022/12/24"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashDeal;