import React, {useEffect, useState} from "react";
import cityService from "../../../services/cityService.ts";
import countryService from "../../../services/countryService.ts";
import BuildingService from "../../../services/buildingService.ts";



interface ICity {
    id: string;
    city: string;
    country: { id: string; country: string };
}


interface ICountry {
    id: string;
    country: string
}

const AddBuilding = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [cityId, setCityId] = useState("");
    const [buildingType, setBuildingType] = useState("");
    const [cities, setCities] = useState<ICity[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const CityService = cityService;
    const CountryService = countryService;

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cityList = await CityService.getAll();
                setCities(cityList);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        const fetchCountries = async () => {
            try {
                const countryList = await CountryService.getAll();
                setCountries(countryList);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
        fetchCities();
    }, []);


    const filteredCities = selectedCountry
        ? cities.filter((city) => city.country.id === selectedCountry)
        : [];

    const handleAddInventory = async () => {
        if (!cityId.trim() || !buildingType.trim() || !name.trim() || !address.trim()) {
            alert("All fields are required and price must be positive.");
            return;
        }

        try {
            await BuildingService.add(name, buildingType, cityId , address);
            setShowModal(false);
        } catch (error) {
            console.error("Error adding inventory:", error);
        }
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
        <div style={{display: "flex", justifyContent: "end"}}>
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
                        <h2 style={{marginBottom: '2rem'}}>Add Country</h2>
                        <input
                            type="text" placeholder="Building Name" style={inputStyle}
                            onChange={(e) => setName(e.target.value)}

                        />
                        <textarea
                            placeholder="Enter address"
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                minHeight: "80px",
                                resize: "vertical",
                            }}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>

                        <select
                            value={buildingType}
                            onChange={(e) => setBuildingType(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            <option value="">Select a Building Type</option>
                            <option key="HOTEL" value="HOTEL">
                                HOTEL
                            </option>
                            <option key="MOTEL" value="MOTEL">
                                MOTEL
                            </option>
                            <option key="RESTAURANT" value="RESTAURANT">
                                RESTAURANT
                            </option>
                        </select>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.country}
                                </option>
                            ))}
                        </select>
                        <select
                            value={cityId}
                            onChange={(e) => setCityId(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            <option value="">Select a City</option>
                            {filteredCities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.city}
                                </option>
                            ))}
                        </select>


                        <div style={actionsStyle}>
                            <button style={addButtonStyle} onClick={handleAddInventory}>Add</button>
                            <button style={cancelButtonStyle} onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBuilding;
