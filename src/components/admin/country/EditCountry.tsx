import React, { useState } from "react";
import countryService from "../../../services/countryService.ts";
interface EditCountryProps {
    country: { id: string,  country: string };
    onClose: () => void;
    onUpdate: (country: { id: string; country: string }) => void;
}

const EditCountry = ({ country, onClose, onUpdate }: EditCountryProps) => {
    const [countryName, setCountryName] = useState(country.country);
    const {edit} = countryService ;

    const handleSaveChanges = async () => {
        onUpdate({ id: country.id, country: countryName });
        try {
            const response = await edit({ id: country.id, country: countryName });
            console.log("Country updated successfully:", response);
        } catch (err) {
            console.error("Error updating country:", err);
        }
        onClose();
    };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ marginBottom: "2rem" }}>Edit Country</h2>
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
    marginRight: '0.5rem',
    marginLeft: '0.5rem',
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

export default EditCountry;
