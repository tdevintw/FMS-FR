import { useEffect, useState } from "react";
import EditCity from "./EditCity";
import CityService from "../../../services/cityService.ts";

interface ICity {
    id: string;
    city: string;
    country?: { id: string; country: string };
}

const City = () => {
    const { getAll, remove } = CityService;
    const [cities, setCities] = useState<ICity[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cityList: ICity[] = await getAll();
                console.log("Cities:", JSON.stringify(cityList));
                setCities(cityList);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, []);

    const handleUpdateCity = (updatedCity: ICity) => {
        setCities(cities.map(item => (item.id === updatedCity.id ? updatedCity : item)));
        setEditModalOpen(false);
    };

    const handleDeleteCity = async (uuid: string) => {
        try {
            await remove(uuid);
            setCities(cities.filter(city => city.id !== uuid));
        } catch (error) {
            console.error("Error deleting city:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light text-center">
                    <tr>
                        <th style={{ width: "20rem" }}>City</th>
                        <th style={{ width: "20rem" }}>Country</th>
                        <th style={{ width: "10rem" }}>Edit</th>
                        <th style={{ width: "10rem" }}>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cities.map((item) => (
                        <tr key={item.id} className="text-center align-middle">
                            <td>{item.city}</td>
                            <td>{item.country?.country || "N/A"}</td>
                            <td>
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                    onClick={() => {
                                        setSelectedCity(item);
                                        setEditModalOpen(true);
                                    }}
                                    alt="Edit"
                                />
                            </td>
                            <td>
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                    onClick={() => handleDeleteCity(item.id)}
                                    alt="Delete"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {editModalOpen && selectedCity && (
                <EditCity
                    city={selectedCity}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={handleUpdateCity}
                />
            )}
        </div>
    );
};

export default City;
