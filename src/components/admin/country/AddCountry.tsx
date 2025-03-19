import { useState } from "react";
import CountryService from "../../../services/countryService.ts";

interface Props {
    fetchCountries: () => void;
}

const AddCountry = ({ fetchCountries }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { add } = CountryService;

    const handleAddCountry = async () => {
        if (!country.trim()) {
            setError("Country name is required.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            await add({ country });
            fetchCountries();  // Refresh country list after adding
            setShowModal(false);
            setCountry("");
        } catch (err) {
            setError("Failed to add country. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "end" }}>
            <button
                style={{
                    backgroundColor: "#13aa52",
                    border: "1px solid #13aa52",
                    borderRadius: "4px",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "10px 45px",
                    marginRight: "10%",
                    marginTop: "2rem",
                }}
                onClick={() => setShowModal(true)}
            >
                Add Country
            </button>

            {showModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }} onClick={() => setShowModal(false)}>
                    <div style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        width: "30rem",
                        textAlign: "center",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                    }} onClick={(e) => e.stopPropagation()}>
                        <h2>Add Country</h2>
                        <input
                            type="text"
                            placeholder="Country name"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            style={{ width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button onClick={handleAddCountry} disabled={loading} style={{ padding: "10px 20px", backgroundColor: "#13aa52", color: "white" }}>
                            {loading ? "Adding..." : "Add"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCountry;
