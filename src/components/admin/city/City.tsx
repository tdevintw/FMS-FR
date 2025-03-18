import  { useState } from "react";
import EditCity from "./EditCity"; // ✅ Import EditCity component

const City = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, title: "Fés", country: "Morocco" },
        { id: 2, title: "Casablanca", country: "Morocco" },
    ]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<{ id: number; title: string; country: string } | null>(null);

    // Function to update city
    const handleUpdateCity = (updatedCity: { id: number; title: string; country: string }) => {
        setCartItems(cartItems.map(item => (item.id === updatedCity.id ? updatedCity : item)));
        setEditModalOpen(false);
    };

    return (
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">City</th>
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">Country</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Edit</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Remove</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.title}
                        </td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.country}
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => { setSelectedCity(item); setEditModalOpen(true); }} // Open Edit Modal
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img style={{ width: "2.2rem" }} src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png" />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editModalOpen && selectedCity && (
                <EditCity
                    city={selectedCity}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={handleUpdateCity} // Pass function for updating
                />
            )}
        </div>
    );
};

export default City;
