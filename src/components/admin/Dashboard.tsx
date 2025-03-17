import { useState } from "react";

const Dashboard = () => {
    const [isHoveredCountry, setIsHoveredCountry] = useState(false);
    const [isHoveredCity, setIsHoveredCity] = useState(false);
    const [isHoveredFood, setIsHoveredFood] = useState(false);
    const [isHoveredCategory, setIsHoveredCategory] = useState(false);

    return (
        <div className="tab-pane" id="account-info" role="tabpanel">
            <div className="myaccount-content">
                <h3>Admin</h3>
                <div className="account-details-form">
                    <div
                        className="d-flex align-items-center justify-content-between mb-3 p-2"
                        style={{
                            transition: "all 0.3s ease",
                            backgroundColor: isHoveredCountry ? "#f5f5f5" : "transparent",
                            cursor: "pointer",
                            borderRadius: "0.5rem",
                            border : '1px solid #d9d8d9',

                        }}
                        onMouseEnter={() => setIsHoveredCountry(true)}
                        onMouseLeave={() => setIsHoveredCountry(false)}
                    >
                        <div style={{ width: "2.5rem" }}>
                            <img
                                src={"https://cdn-icons-png.flaticon.com/128/4830/4830735.png"}
                                alt="Country"
                            />
                        </div>
                        <span>Country</span>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between mb-3 p-2"
                        style={{
                            transition: "all 0.3s ease",
                            backgroundColor: isHoveredCity ? "#f5f5f5" : "transparent",
                            cursor: "pointer",
                            borderRadius: "0.5rem",
                            border : '1px solid #d9d8d9',

                        }}
                        onMouseEnter={() => setIsHoveredCity(true)}
                        onMouseLeave={() => setIsHoveredCity(false)}
                    >
                        <div style={{ width: "2.5rem" }}>
                            <img
                                src={"https://cdn-icons-png.flaticon.com/128/2451/2451728.png"}
                                alt="City"
                            />
                        </div>
                        <span>City</span>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between mb-3 p-2"
                        style={{
                            transition: "all 0.3s ease",
                            backgroundColor: isHoveredFood ? "#f5f5f5" : "transparent",
                            cursor: "pointer",
                            borderRadius: "0.5rem",
                            border : '1px solid #d9d8d9',
                        }}
                        onMouseEnter={() => setIsHoveredFood(true)}
                        onMouseLeave={() => setIsHoveredFood(false)}
                    >
                        <div style={{ width: "2.5rem" }}>
                            <img
                                src={"https://cdn-icons-png.flaticon.com/128/706/706195.png"}
                                alt="Food"
                            />
                        </div>
                        <span>Food</span>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-between mb-3 p-2"
                        style={{
                            transition: "all 0.3s ease",
                            backgroundColor: isHoveredCategory ? "#f5f5f5" : "transparent",
                            cursor: "pointer",
                            borderRadius: "0.5rem",
                            border : '1px solid #d9d8d9',
                        }}
                        onMouseEnter={() => setIsHoveredCategory(true)}
                        onMouseLeave={() => setIsHoveredCategory(false)}
                    >
                        <div style={{ width: "2.5rem" }}>
                            <img
                                src={"https://cdn-icons-png.flaticon.com/128/561/561611.png"}
                                alt="Category"
                            />
                        </div>
                        <span>Category</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
