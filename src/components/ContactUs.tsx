const ContactUs = ()=>{
    return (
        <div className="contact-us-area">
            <div className="container container-default-2 custom-area">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-custom">
                        <div className="contact-info-item">
                            <div className="con-info-icon">
                                <i className="ion-ios-location-outline"></i>
                            </div>
                            <div className="con-info-txt">
                                <h4>Our Location</h4>
                                <p>(800) 123 456 789 / (800) 123 456 789 info@example.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-custom">
                        <div className="contact-info-item">
                            <div className="con-info-icon">
                                <i className="ion-iphone"></i>
                            </div>
                            <div className="con-info-txt">
                                <h4>Contact us Anytime</h4>
                                <p>Mobile: 012 345 678<br/>Fax: 123 456 789</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-custom text-align-center">
                        <div className="contact-info-item">
                            <div className="con-info-icon">
                                <i className="ion-ios-email-outline"></i>
                            </div>
                            <div className="con-info-txt">
                                <h4>Support Overall</h4>
                                <p>Support24/7@example.com <br/> info@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-custom">
                        <form method="post" action="http://whizthemes.com/mail-php/reza/obrien/mail.php"
                              id="contact-form" accept-charset="UTF-8" className="contact-form">
                            <div className="comment-box mt-5">
                                <h5 className="text-uppercase">Get in Touch</h5>
                                <div className="row mt-3">
                                    <div className="col-md-6 col-custom">
                                        <div className="input-item mb-4">
                                            <input className="border rounded-0 w-100 input-area name" type="text"
                                                   name="con_name" id="con_name" placeholder="Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-custom">
                                        <div className="input-item mb-4">
                                            <input className="border rounded-0 w-100 input-area email" type="email"
                                                   name="con_email" id="con_email" placeholder="Email"/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-custom">
                                        <div className="input-item mb-4">
                                            <input className="border rounded-0 w-100 input-area email" type="text"
                                                   name="con_content" id="con_content" placeholder="Subject"/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-custom">
                                        <div className="input-item mb-4">
                                            <textarea
                                                      className="border rounded-0 w-100 custom-textarea input-area"
                                                      name="con_message" id="con_message"
                                                      placeholder="Message"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 col-custom mt-40">
                                        <button type="submit" id="submit" name="submit"
                                                className="btn obrien-button primary-btn rounded-0 mb-0">Send A Message
                                        </button>
                                    </div>
                                    <p className="col-12 col-custom form-message mb-0"></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs ;