import { useEffect, useState } from "react";
import inventoryService from "../../../services/inventoryService.ts";
import EditInventory from "./EditInventory.tsx";

interface ICity {
    id: string;
    city: string;
    country: { id: string; country: string };
}

interface InventoryItem {
    id: string;
    price: number;
    user: { id: string, username: string, email: string, role: string };
    food: {
        id: string, food: string, imageUrl: string,
        category: { id: string, category: string, imageUrl: string }
    };
    city: ICity;
}

const Inventory = () => {
    const [inventories, setInventories] = useState<InventoryItem[]>([]);
    const [selectedInventory, setSelectedInventory] = useState<InventoryItem | null>(null);
    const InventoryService = inventoryService;
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const inventoryList = await InventoryService.getAll();
                setInventories(inventoryList);
            } catch (error) {
                console.error("Error fetching inventories:", error);
            }
        };
        fetchInventories();
    }, []);

    const handleRemove = async (id: string) => {
        try {
            await InventoryService.remove(id);
            setInventories((prevInventories) => prevInventories.filter((inventory) => inventory.id !== id));
        } catch (error) {
            console.error("Error removing inventory:", error);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr className="text-center">
                        <th>Food</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventories.map((item) => (
                        <tr key={item.id} className="text-center">
                            <td className="align-middle">{item.food.food}</td>
                            <td className="align-middle">
                                <img
                                    style={{ width: "7rem", borderRadius: "8px" }}
                                    src={item.food.imageUrl}
                                    alt={item.food.food}
                                    className="img-fluid"
                                />
                            </td>
                            <td className="align-middle">{item.price} Dhs</td>
                            <td className="align-middle">{item.city.city}</td>
                            <td className="align-middle">{item.city.country.country}</td>
                            <td className="align-middle">
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                    onClick={() => {
                                        setSelectedInventory(item);
                                        setEditModalOpen(true);
                                    }}
                                />
                            </td>
                            <td className="align-middle">
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                    onClick={() => handleRemove(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {editModalOpen && selectedInventory && (
                <EditInventory
                    inventory={selectedInventory}
                    onClose={() => setEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Inventory;
