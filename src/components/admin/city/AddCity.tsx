import { useState, useEffect } from "react";
import CityService from "../../../services/cityService.ts";
import CountryService from "../../../services/countryService.ts";

const AddCity = () => {
    const [showModal, setShowModal] = useState(false);
    const [city, setCity] = useState("");
    const [countryId, setCountryId] = useState("");
    const [countries, setCountries] = useState<{ id: string; country: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countryList = await CountryService.getAll();
                setCountries(countryList);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    const handleAddCity = async () => {
        if (!city.trim() || !countryId.trim()) {
            setError("City name and country are required.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            await CityService.add({ city, countryId });
            setShowModal(false);
        } catch (err) {
            setError("Failed to add city. Please try again.");
            console.error("Error adding city:", err);
        } finally {
            setLoading(false);
        }
    };

    // Styles from old component
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
        marginRight: "0.5rem",
        marginLeft: "0.5rem",
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

    const selectStyle: React.CSSProperties = {
        ...inputStyle,
        cursor: "pointer",
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

    return (
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

            {showModal && (
                <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
                    <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ marginBottom: "2rem" }}>Add City</h2>

                        <input
                            type="text"
                            placeholder="City name"
                            style={inputStyle}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <select
                            value={countryId}
                            onChange={(e) => setCountryId(e.target.value)}
                            style={selectStyle}
                        >
                            <option value="">Select a country</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                    {country.country}
                                </option>
                            ))}
                        </select>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <div style={actionsStyle}>
                            <button
                                style={addButtonStyle}
                                onClick={handleAddCity}
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
        </div>
    );
};

export default AddCity;
