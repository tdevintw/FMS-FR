import {useEffect, useState} from "react";
import EditCity from "./EditCity";
import CityService from "../../../services/cityService.ts";

interface ICity {
    id: string;
    city: string;
    country?: { id: string; country: string };
}


const City = () => {
    const {getAll, remove} = CityService;
    const [cities, setCities] = useState<ICity[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cityList: ICity[] = await getAll();
                console.log("cities : " + JSON.stringify(cityList));
                setCities(cityList);
            } catch (error) {
                console.error("Error fetching cities or countries:", error);
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
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-3" style={{textAlign: "center", width: "20rem", border: "1px solid gray"}}>
                        City
                    </th>
                    <th className="p-3" style={{textAlign: "center", width: "20rem", border: "1px solid gray"}}>
                        Country
                    </th>
                    <th className="p-3" style={{textAlign: "center", border: "1px solid gray"}}>Edit</th>
                    <th className="p-3" style={{textAlign: "center", border: "1px solid gray"}}>Remove</th>
                </tr>
                </thead>
                <tbody>
                {cities.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td className="p-3" style={{border: "1px solid gray"}}>{item.city}</td>
                        <td className="p-3" style={{border: "1px solid gray"}}>{item.country?.country}</td>
                        <td className="p-3 text-center" style={{border: "1px solid gray", width: "10rem"}}>
                            <img
                                style={{width: "2.2rem", cursor: "pointer"}}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => {
                                    setSelectedCity(item);
                                    setEditModalOpen(true);
                                }}
                            />
                        </td>
                        <td className="p-3 text-center" style={{border: "1px solid gray", width: "10rem"}}>
                            <img
                                style={{width: "2.2rem", cursor: "pointer"}}
                                src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                onClick={() => handleDeleteCity(item.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

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
