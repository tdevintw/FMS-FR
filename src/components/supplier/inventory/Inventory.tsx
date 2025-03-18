import { useState } from "react";
import EditInventory from "./EditInventory.tsx";

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([
        { id: 1, name: "Apple", price: "$2", food: "Fruit" },
        { id: 2, name: "Milk", price: "$1", food: "Dairy" },
    ]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState<{ id: number; name: string; price: string; food: string } | null>(null);

    const handleUpdateInventory = (updatedInventory: { id: number; name: string; price: string; food: string }) => {
        setInventoryItems(inventoryItems.map(item => (item.id === updatedInventory.id ? updatedInventory : item)));
        setEditModalOpen(false);
    };

    return (
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">Item</th>
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">Price</th>
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">Food Type</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Edit</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Remove</th>
                </tr>
                </thead>
                <tbody>
                {inventoryItems.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.name}
                        </td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.price}
                        </td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.food}
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => { setSelectedInventory(item); setEditModalOpen(true); }}
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img style={{ width: "2.2rem" }} src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png" />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editModalOpen && selectedInventory && (
                <EditInventory
                    inventory={selectedInventory}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={handleUpdateInventory}
                />
            )}
        </div>
    );
};

export default Inventory;
