import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";
import userService from "../../services/userService.ts";
import {useEffect, useState} from "react";

interface IUser {
    id : string ;
    username : string ;
    email : string ;
    role : string
}
const Header = () => {

    const  {user} = useAuth() ;
    const [userData, setUserData] = useState<IUser | null >(null);

    useEffect(() => {
        if (user) {
            userService.getUser().then(setUserData).catch((error) => {
                console.error("Error fetching user data:", error);
            });
        }
    }, [user]);
    return (
        <header className="main-header-area">
            <div className="main-header">
                <div className="container container-default custom-area">
                    <div className="row">
                        <div className="col-lg-12 col-custom">
                            <div className="row align-items-center">
                                <div className="col-lg-2 col-xl-2 col-sm-6 col-6 col-custom">
                                    <div className="header-logo d-flex align-items-center">
                                        <Link to={"/"}>
                                            <img className="img-full" src="https://i.ibb.co/fYKCLGJk/logo2.png" alt="Header Logo" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-lg-8 col-xl-7 position-static d-none d-lg-block col-custom">
                                    <nav className="main-nav d-flex justify-content-center">
                                        <ul className="nav">
                                            <li>
                                                <Link to="/">
                                                    <span className="menu-text"> Home</span>
                                                </Link>
                                            </li>
                                            {user && (
                                                <li>
                                                    <Link to={"/profile"}>
                                                        <span className="menu-text">Profile</span>
                                                    </Link>
                                                </li>
                                            )}
                                            {user && userData &&userData.role==="MANAGER" && (
                                                <li>
                                                    <Link to={"/order"}>
                                                        <span className="menu-text">Order</span>
                                                    </Link>
                                                </li>
                                            )}

                                            <li>
                                                <Link to="/about" >
                                                    <span className="menu-text">About</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/contact-us" >
                                                    <span className="menu-text">Contact us</span>
                                                </Link>
                                            </li>


                                        </ul>
                                    </nav>
                                </div>

                                <div className="col-lg-2 col-xl-3 col-sm-6 col-6 col-custom">
                                    <div className="header-right-area main-nav">
                                        <ul className="nav">
                                            {!user && (
                                                <li className="login-register-wrap d-none d-xl-flex">
                                                <span>
                                                    <Link to="/login" >Login</Link>
                                                </span>
                                                    <span><Link to="/register" >Register</Link></span>
                                                </li>
                                            )}

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

            <aside className="off-canvas-wrapper" id="mobileMenu">
            </aside>
        </header>
    );
};

export default Header;