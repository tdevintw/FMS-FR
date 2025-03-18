import  { useState } from "react";
import EditBuilding from "./EditBuilding.tsx";

const Building = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Mimouna" , type : "Hotel" , city: "Fés" },
        { id: 1, name: "USA Motels" , type : "Motel" , city: "California" },

    ]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState<{ id: number; name: string; type: string; city : string} | null>(null);

    const handleUpdateBuilding = (updatedBuilding: { id: number; name: string; type: string; city : string }) => {
        setCartItems(cartItems.map(item => (item.id === updatedBuilding.id ? updatedBuilding : item)));
        setEditModalOpen(false);
    };

    return (
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">Building</th>
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">Type</th>
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">City</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Edit</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Remove</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.name}
                        </td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.type}
                        </td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.city}
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => { setSelectedBuilding(item); setEditModalOpen(true); }} // Open Edit Modal
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img style={{ width: "2.2rem" }} src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png" />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editModalOpen && selectedBuilding && (
                <EditBuilding
                    building={selectedBuilding}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={handleUpdateBuilding} // Pass function for updating
                />
            )}
        </div>
    );
};

export default Building;
