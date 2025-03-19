import {useEffect, useState} from "react";
import EditCountry from "./EditCountry"; // Import EditCountry component
import CountryService from "../../../services/countryService.ts";

interface ICountry {
    id: string,
    country: string
}

const Country = () => {
    const {getAll} = CountryService;
    const {remove} = CountryService;
    const [cartItems, setCartItems] = useState<ICountry[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<{ id: string; country: string } | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countries = await getAll();
                setCartItems(countries);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    },[]);

    const handleUpdateCountry = (updatedCountry: { id: string; country: string }) => {
        setCartItems(cartItems.map(item => (item.id === updatedCountry.id ? updatedCountry : item)));
        setEditModalOpen(false);
    };

    const handleDeleteCountry = async (uuid: string) => {
        try {
            await remove(uuid);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    }


    return (
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th style={{textAlign: "center", width: "20rem", border: "1px solid gray"}}
                        className="p-3">Country
                    </th>
                    <th style={{textAlign: "center", border: "1px solid gray"}} className="p-3">Edit</th>
                    <th style={{textAlign: "center", border: "1px solid gray"}} className="p-3">Remove</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td className="p-3" style={{border: "1px solid gray"}}>
                            {item.country}
                        </td>
                        <td className="p-3 cursor-pointer text-center"
                            style={{border: "1px solid gray", width: "10rem"}}>
                            <img
                                style={{width: "2.2rem", cursor: "pointer"}}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => {
                                    setSelectedCountry(item);
                                    setEditModalOpen(true);
                                }}
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center"
                            style={{border: "1px solid gray", width: "10rem"}}>
                            <img
                                style={{width: "2.2rem",cursor : "pointer"}}
                                src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                onClick={() => {
                                    handleDeleteCountry(item.id)
                                }}
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
