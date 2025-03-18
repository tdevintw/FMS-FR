import React, { useState } from "react";

interface EditCityProps {
    city: { id: number; title: string; country: string };
    onClose: () => void;
    onUpdate: (city: { id: number; title: string; country: string }) => void;
}

const EditCity = ({ city, onClose, onUpdate }: EditCityProps) => {
    const [cityName, setCityName] = useState(city.title);
    const [countryName, setCountryName] = useState(city.country);

    const handleSaveChanges = () => {
        onUpdate({
            id: city.id,
            title: cityName,
            country: countryName,
        });
        onClose();
    };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ marginBottom: "2rem" }}>Edit City</h2>
                <input
                    type="text"
                    placeholder="City Name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="text"
                    placeholder="Country Name"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    style={inputStyle}
                />

                <div style={actionsStyle}>
                    <button style={saveButtonStyle} onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                    <button style={cancelButtonStyle} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

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

const saveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#13aa52",
    color: "white",
};

const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#d9534f",
    color: "white",
};

export default EditCity;
