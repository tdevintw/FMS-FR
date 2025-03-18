import { useState } from "react";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [isHoveredBuilding, setIsHoveredBuilding] = useState(false);

    return (
        <div className="tab-pane" id="account-info" role="tabpanel">
            <div className="myaccount-content">
                <h3>Manager</h3>
                <div className="account-details-form">
                    <Link to={"/manager/buildings"}
                        className="d-flex align-items-center justify-content-between mb-3 p-2"
                        style={{
                            transition: "all 0.3s ease",
                            backgroundColor: isHoveredBuilding ? "#f5f5f5" : "transparent",
                            cursor: "pointer",
                            borderRadius: "0.5rem",
                            border : '1px solid #d9d8d9',
                        }}
                        onMouseEnter={() => setIsHoveredBuilding(true)}
                        onMouseLeave={() => setIsHoveredBuilding(false)}
                    >
                        <div style={{ width: "2.5rem" }}>
                            <img
                                src={"https://cdn-icons-png.flaticon.com/128/17746/17746611.png"}
                                alt="Building"
                            />
                        </div>
                        <span>Building</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
