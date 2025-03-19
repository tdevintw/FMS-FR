import { useState } from "react";
import EditCountry from "./EditCountry";
import CountryService from "../../../services/countryService.ts";

interface Country {
    id: string;
    country: string;
}

interface Props {
    countries: Country[];
    setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
}

const Country = ({ countries, setCountries }: Props) => {
    const { remove } = CountryService;
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const handleUpdateCountry = (updatedCountry: Country) => {
        setCountries(countries.map(item => (item.id === updatedCountry.id ? updatedCountry : item)));
        setEditModalOpen(false);
    };

    const handleDeleteCountry = async (id: string) => {
        try {
            await remove(id);
        } catch (error) {
            console.error("Error deleting country:", error);
        }
    };

    return (
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">Country</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Edit</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Remove</th>
                </tr>
                </thead>
                <tbody>
                {countries.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.country}
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => { setSelectedCountry(item); setEditModalOpen(true); }}
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                onClick={() => handleDeleteCountry(item.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

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
