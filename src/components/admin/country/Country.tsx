import { useEffect, useState } from "react";
import EditCountry from "./EditCountry";
import CountryService from "../../../services/countryService.ts";

interface ICountry {
    id: string;
    country: string;
}

const Country = () => {
    const { getAll, remove } = CountryService;
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countryList = await getAll();
                setCountries(countryList);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    const handleUpdateCountry = (updatedCountry: ICountry) => {
        setCountries(countries.map(item => (item.id === updatedCountry.id ? updatedCountry : item)));
        setEditModalOpen(false);
    };

    const handleDeleteCountry = async (uuid: string) => {
        try {
            await remove(uuid);
            setCountries(countries.filter(country => country.id !== uuid)); // Mettre à jour la liste
        } catch (error) {
            console.error("Error deleting country:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light text-center">
                    <tr>
                        <th style={{ width: "20rem" }}>Country</th>
                        <th style={{ width: "10rem" }}>Edit</th>
                        <th style={{ width: "10rem" }}>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {countries.map((item) => (
                        <tr key={item.id} className="text-center align-middle">
                            <td>{item.country}</td>
                            <td>
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                    onClick={() => {
                                        setSelectedCountry(item);
                                        setEditModalOpen(true);
                                    }}
                                    alt="Edit"
                                />
                            </td>
                            <td>
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                    onClick={() => handleDeleteCountry(item.id)}
                                    alt="Delete"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {editModalOpen && selectedCountry && (
                <EditCountry
                    country={selectedCountry}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={handleUpdateCountry}
                />
            )}
        </div>
    );
};

export default Country;
