import React, {useEffect, useState} from "react";
import cityService from "../../../services/cityService.ts";
import countryService from "../../../services/countryService.ts";
import buildingService from "../../../services/buildingService.ts";

interface IUser {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface ICity {
    id: string;
    city: string;
    country: { id: string; country: string };
}


interface ICountry {
    id: string;
    country: string
}

interface EditBuildingProps {
    building: {
        id: string;
        name: string;
        city: ICity;
        buildingType: string;
        manager: IUser;
        address : string;

    };
    onClose: () => void;
}

const EditBuilding = ({building, onClose}: EditBuildingProps) => {

    const [name, setName] = useState(building.name);
    const [address , setAddress] = useState(building.address);
    const [cityId, setCityId] = useState(building.city.id);
    const [buildingType, setBuildingType] = useState(building.buildingType);
    const [cities, setCities] = useState<ICity[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState(building.city.country.id);
    const CityService = cityService;
    const CountryService = countryService;
    const BuildingService = buildingService;
    useEffect(() => {
        console.log("buildings : " + JSON.stringify(building));
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


    const handleSaveChanges = async () => {
        await BuildingService.edit({id: building.id, name: name, buildingType: buildingType, cityId: cityId , address : address});
        onClose();
    };




    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2 style={{marginBottom: "2rem"}}>Edit Building</h2>
                <input
                    type="text"
                    placeholder="Building Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
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
                >{building.address}</textarea>
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
                    style={inputStyle}
                >
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.country}
                        </option>
                    ))}
                </select>
                <select
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Select a City</option>
                    {cities
                        .filter((city) => city.country.id === selectedCountry)
                        .map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.city}
                            </option>
                        ))}
                </select>
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

export default EditBuilding;
