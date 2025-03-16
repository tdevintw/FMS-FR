import React from "react";
import {Link} from "react-router-dom";

export const AuthHeader: React.FC = () => {

    return (
        <div className="breadcrumbs-area position-relative">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="breadcrumb-content position-relative section-content">
                            <h3 className="title-3">Login-Register</h3>
                            <ul>
                                <li><Link to={"/"}>Home</Link></li>
                                <li>Login-Register</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




