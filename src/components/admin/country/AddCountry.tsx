import React, { useState } from "react";
import CountryService from "../../../services/countryService.ts";

const AddCountry = () => {
    const [showModal, setShowModal] = useState(false);
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { add } = CountryService;

    const modalOverlayStyle: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const modalContentStyle: React.CSSProperties = {
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "30rem",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
    };

    const actionsStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px",
    };

    const buttonStyle: React.CSSProperties = {
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    };

    const addButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "#13aa52",
        color: "white",
    };

    const cancelButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "#d9534f",
        color: "white",
    };

    const handleAddCountry = async () => {
        if (!country.trim()) {
            setError("Country name is required.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await add({ country });
            console.log("Country added successfully:", response);
            setShowModal(false);
        } catch (err) {
            setError("Failed to add country. Please try again.");
            console.error("Error adding country:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <button
                    style={{
                        backgroundColor: "#13aa52",
                        border: "1px solid #13aa52",
                        borderRadius: "4px",
                        boxShadow: "rgba(0, 0, 0, .1) 0 2px 4px 0",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "16px",
                        padding: "10px 45px",
                        marginRight: "10%",
                        marginTop: "2rem",
                    }}
                    onClick={() => setShowModal(true)}
                >
                    Add
                </button>
            </div>

            {showModal && (
                <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
                    <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ marginBottom: "2rem" }}>Add Country</h2>

                        <input
                            type="text"
                            placeholder="Country name"
                            style={inputStyle}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <div style={actionsStyle}>
                            <button
                                style={addButtonStyle}
                                onClick={handleAddCountry}
                                disabled={loading}
                            >
                                {loading ? "Adding..." : "Add"}
                            </button>
                            <button
                                style={cancelButtonStyle}
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddCountry;
