import { useState } from "react";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [isHoveredOrders, setIsHoveredOrders] = useState(false);

    return (
        <div className="tab-pane" id="account-info" role="tabpanel">
            <div className="myaccount-content">
                <h3>Shipper</h3>
                <div className="account-details-form">
                    <Link to={"/shipper/orders"}
                          className="d-flex align-items-center justify-content-between mb-3 p-2"
                          style={{
                              transition: "all 0.3s ease",
                              backgroundColor: isHoveredOrders ? "#f5f5f5" : "transparent",
                              cursor: "pointer",
                              borderRadius: "0.5rem",
                              border : '1px solid #d9d8d9',
                          }}
                          onMouseEnter={() => setIsHoveredOrders(true)}
                          onMouseLeave={() => setIsHoveredOrders(false)}
                    >
                        <div style={{ width: "2.5rem" }}>
                            <img
                                src={"https://cdn-icons-png.flaticon.com/128/3859/3859737.png"}
                                alt="Building"
                            />
                        </div>
                        <span>Orders</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
