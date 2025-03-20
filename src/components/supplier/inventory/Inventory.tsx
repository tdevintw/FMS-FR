import {useEffect, useState} from "react";
import inventoryService from "../../../services/inventoryService.ts";
import EditInventory from "./EditInventory.tsx";


interface InventoryItem {
    id: string;
    price: number;
    user: { id: string, username: string, email: string, role: string };
    food: {
        id: string, food: string, imageUrl: string,
        category: { id: string, category: string, imageUrl: string }
    };
}


const Inventory = () => {
    const [inventories , setInventories] = useState<InventoryItem[]>([]);
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
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th style={{textAlign: "center", width: "20rem", border: "1px solid gray"}} className="p-3">Food
                    </th>
                    <th style={{textAlign: "center", width: "20rem", border: "1px solid gray"}} className="p-3">Price
                    </th>
                    <th style={{textAlign: "center", border: "1px solid gray", width :"10rem"}} className="p-3">Edit</th>
                    <th style={{textAlign: "center", border: "1px solid gray", width :"10rem"}} className="p-3">Remove</th>
                </tr>
                </thead>
                <tbody>
                {inventories.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td className="p-3" style={{border: "1px solid gray"}}>
                            {item.food.food}
                        </td>
                        <td className="p-3" style={{border: "1px solid gray"}}>
                            {item.price} Dhs
                        </td>

                        <td className="p-3 cursor-pointer text-center"
                            style={{border: "1px solid gray", width: "10rem"}}>
                            <img
                                style={{width: "2.2rem", cursor: "pointer"}}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => {
                                    setSelectedInventory(item);
                                    setEditModalOpen(true);
                                }}
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center"
                            style={{border: "1px solid gray", width: "10rem"}}>
                            <img style={{width: "2.2rem" , cursor : "pointer"}}
                                 src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                 onClick={() => handleRemove(item.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

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
