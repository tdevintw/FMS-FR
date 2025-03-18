import React from "react";
import {Link} from "react-router-dom";

interface DashboardHeaderProps {
    page: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({page}) => {

    return (
        <div className="breadcrumbs-area position-relative">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="breadcrumb-content position-relative section-content">
                            <h3 className="title-3">{page}</h3>
                            <ul>
                                <li><Link to={"/"}>Home</Link>-<Link to={"/Profile"}>Profile</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




