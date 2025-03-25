
import React, { useEffect, useState } from "react";
import cityService from "../../../services/cityService.ts";
import countryService from "../../../services/countryService.ts";
import buildingService from "../../../services/buildingService.ts";

interface ICity{

    id: string;
    city: string;
    country: ICountry

}

interface ICountry{
    id: string;
    country: string
}




interface EditBuildingProps {
    building: {
        id: string;
        name: string;
        city:  ICity;
        buildingType: string;
        address: string;
    };
    onClose: () => void;
    onUpdate: (updatedBuilding: {
        id: string;
        name: string;
        buildingType: string;
        cityId: string;
        address: string;
        city?: ICity;
        country?: ICountry;
    }) => void;
}

const EditBuilding = ({ building, onClose, onUpdate }: EditBuildingProps) => {
    const [name, setName] = useState(building.name);
    const [address, setAddress] = useState(building.address);
    const [cityId, setCityId] = useState(building.city.id);
    const [buildingType, setBuildingType] = useState(building.buildingType);
    const [cities, setCities] = useState<ICity[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState(building.city.country.id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cityList, countryList] = await Promise.all([
                    cityService.getAll(),
                    countryService.getAll()
                ]);
                setCities(cityList);
                setCountries(countryList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSaveChanges = async () => {
        if (!name.trim() || !address.trim() || !buildingType.trim() || !cityId) {
            return;
        }


        try {
            await buildingService.edit({
                id: building.id,
                name,
                buildingType,
                cityId,
                address
            });

            const selectedCity = cities.find(city => city.id === cityId);
            const selectedCountry = countries.find(country => country.id === selectedCity?.country.id);

            onUpdate({
                id: building.id,
                name,
                buildingType,
                cityId,
                address,
                city: selectedCity || building.city,
                country: selectedCountry || building.city.country
            });

            onClose();
        } catch (error) {
            console.error("Error updating building:", error);
        }
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
