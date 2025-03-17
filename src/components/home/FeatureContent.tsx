
const FeatureContent = () => {
    return (
        <div className="feature-area mb-no-text">
            <div className="container container-default custom-area">
                <div className="row">
                    <div className="col-xl-6 col-lg-5 col-md-12 col-custom">
                        <div className="feature-content-wrapper">
                            <h2 className="title">Optimize Food Stock & Reduce Waste</h2>
                            <p className="desc-content">Managing food efficiently reduces waste, optimizes costs, and ensures food quality.</p>
                            <p className="desc-content">Keep track of food consumption, supplier performance, and stock levels easily.</p>
                            <p className="desc-content">A centralized platform for monitoring food supply and reducing losses.</p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-7 col-md-12 col-custom">
                        <div className="feature-image position-relative">
                            <img src="../src/assets/images/feature/feature-2.jpg" alt="Obrien Feature" />
                            <div className="popup-video position-absolute">
                                <a className="popup-vimeo" href="https://www.youtube.com/watch?v=_9VUPq3SxOc">
                                    <i className="ion-play"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureContent;