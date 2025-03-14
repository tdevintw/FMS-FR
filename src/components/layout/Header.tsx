const Header = () => {
    return (
        <header className="main-header-area">
            <div className="main-header">
                <div className="container container-default custom-area">
                    <div className="row">
                        <div className="col-lg-12 col-custom">
                            <div className="row align-items-center">
                                {/* Logo */}
                                <div className="col-lg-2 col-xl-2 col-sm-6 col-6 col-custom">
                                    <div className="header-logo d-flex align-items-center">
                                        <a href="index.html">
                                            <img className="img-full" src="../src/assets/images/logo/logo2.png" alt="Header Logo" />
                                        </a>
                                    </div>
                                </div>

                                {/* Navigation Menu */}
                                <div className="col-lg-8 col-xl-7 position-static d-none d-lg-block col-custom">
                                    <nav className="main-nav d-flex justify-content-center">
                                        <ul className="nav">
                                            <li>
                                                <a className="active" href="index.html">
                                                    <span className="menu-text"> Home</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="shop.html">
                                                    <span className="menu-text">Shop</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="blog-details-fullwidth.html">
                                                    <span className="menu-text"> Blog</span>
                                                </a>
                                                {/* Blog dropdown menu */}
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="menu-text"> Pages</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="about-us.html">
                                                    <span className="menu-text"> About</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="contact-us.html">
                                                    <span className="menu-text">Contact</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>

                                {/* Header Right */}
                                <div className="col-lg-2 col-xl-3 col-sm-6 col-6 col-custom">
                                    <div className="header-right-area main-nav">
                                        <ul className="nav">
                                            <li className="login-register-wrap d-none d-xl-flex">
                                                <span><a href="login.html">Login</a></span>
                                                <span><a href="register.html">Register</a></span>
                                            </li>
                                            <li className="minicart-wrap">
                                                <a href="#" className="minicart-btn toolbar-btn">
                                                    <i className="ion-bag"></i>
                                                </a>
                                                {/* Cart dropdown */}
                                            </li>
                                            <li className="mobile-menu-btn d-lg-none">
                                                <a className="off-canvas-btn" href="#">
                                                    <i className="fa fa-bars"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <aside className="off-canvas-wrapper" id="mobileMenu">
                {/* Mobile menu content */}
            </aside>
        </header>
    );
};

export default Header;