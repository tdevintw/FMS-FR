const About = ()=>{
return (
    <div className="feature-area mb-no-text">
        <div className="container container-default custom-area">
            <div className="row">
                <div className="col-xl-6 col-lg-5 col-md-12 col-custom">
                    <div className="feature-content-wrapper">
                        <h2 className="title">Our Vision</h2>
                        <p className="desc-content">Efficient food management is a major challenge for hotels and restaurants, especially with increasing demand, such as during major events like the 2030 World Cup in Morocco.

                            Our Food Management System (FMS) is a digital solution designed to optimize food stock management, streamline ordering from suppliers, and provide accurate analytics on consumption and costs. By replacing traditional methods like spreadsheets and paper with a centralized platform, we enable hotel managers to track shipments, reduce waste, and ensure optimal inventory levels while saving time, money, and effort   .</p>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-7 col-md-12 col-custom">
                    <div className="feature-image position-relative">
                        <img src="https://i.ibb.co/76R27Zc/feature-2.jpg" alt="Obrien Feature"/>
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
)
}
export default About;