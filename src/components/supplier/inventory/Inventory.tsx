import { useState } from "react";
import EditInventory from "./EditInventory.tsx";

interface InventoryItem {
    id: string;
    price: number;
    user: {
        id: string,
        username: string,
        email: string,
        role: string
    };
    food: {
        id: string,
        food: string,
        imageUrl: string,
        category: {
            id: string,
            category: string,
            imageUrl: string
        }
    };
    city: {
        id: string;
        city: string;
        country: {
            id: string;
            country: string
        };
    };
}

interface InventoryProps {
    inventories: InventoryItem[];
    onUpdateInventory: (updatedInventory: {
        id: string;
        foodId: string;
        price: number;
        cityId: string;
    }) => void;
    onDeleteInventory: (id: string) => void;
    loading: boolean;
}

const Inventory = ({
                       inventories,
                       onUpdateInventory,
                       onDeleteInventory,
                       loading
                   }: InventoryProps) => {
    const [selectedInventory, setSelectedInventory] = useState<InventoryItem | null>(null);

    return (
        <div className="container mt-5 mb-5">
            {loading ? (
                <div>Loading inventories...</div>
            ) : (
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
                                        onClick={() => setSelectedInventory(item)}
                                    />
                                </td>
                                <td className="align-middle">
                                    <img
                                        style={{ width: "2.2rem", cursor: "pointer" }}
                                        src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                        onClick={() => onDeleteInventory(item.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedInventory && (
                <EditInventory
                    inventory={selectedInventory}
                    onClose={() => setSelectedInventory(null)}
                    onUpdate={onUpdateInventory}
                />
            )}
        </div>
    );
};

export default Inventory;