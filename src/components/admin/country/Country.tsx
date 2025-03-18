import  { useState } from "react";
import EditCountry from "./EditCountry"; // Import EditCountry component

const Country = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, country: "Morocco" },
        { id: 2, country: "France" },
    ]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<{ id: number; country: string } | null>(null);

    const handleUpdateCountry = (updatedCountry: { id: number; country: string }) => {
        setCartItems(cartItems.map(item => (item.id === updatedCountry.id ? updatedCountry : item)));
        setEditModalOpen(false);
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
                {cartItems.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.country}
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => { setSelectedCountry(item); setEditModalOpen(true); }} // Open Edit Modal
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img style={{ width: "2.2rem" }} src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png" />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editModalOpen && selectedCountry && (
                <EditCountry
                    country={selectedCountry}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={handleUpdateCountry} // Pass function for updating
                />
            )}
        </div>
    );
};

export default Country;
