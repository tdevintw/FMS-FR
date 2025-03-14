
const BannerArea = () => {
    return (
        <div className="banner-area">
            <div className="container container-default custom-area">
                <div className="row">
                    <div className="col-md-4 col-sm-12 col-custom">
                        <div className="banner-image hover-style">
                            <a className="d-block" href="shop.html">
                                <img className="w-100" src="../src/assets/images/banner/small-banner/1-1.png" alt="Banner Image" />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-custom">
                        <div className="banner-image hover-style">
                            <a className="d-block" href="shop.html">
                                <img className="w-100" src="../src/assets/images/banner/small-banner/1-2.png" alt="Banner Image" />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-custom">
                        <div className="banner-image hover-style mb-0">
                            <a className="d-block" href="shop.html">
                                <img className="w-100" src="../src/assets/images/banner/small-banner/1-3.png" alt="Banner Image" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerArea;