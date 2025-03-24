import { useState, useEffect } from 'react';
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import AddInventory from "../../components/supplier/inventory/AddInventory.tsx";
import Inventory from "../../components/supplier/inventory/Inventory.tsx";
import inventoryService from "../../services/inventoryService.ts";

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

const InventoryPage = () => {
    const [inventories, setInventories] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchInventories = async () => {
        try {
            setLoading(true);
            const inventoryList = await inventoryService.getAll();
            setInventories(inventoryList);
        } catch (error) {
            console.error("Error fetching inventories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventories();
    }, []);

    const handleAddInventory = (newInventory: InventoryItem) => {
        setInventories(prev => [...prev, newInventory]);
    };

    const handleUpdateInventory = (updatedInventory: {
        id: string;
        foodId: string;
        price: number;
        cityId: string;
    }) => {
        setInventories(prev =>
            prev.map(item =>
                item.id === updatedInventory.id
                    ? {
                        ...item,
                        price: updatedInventory.price,
                        food: {
                            ...item.food,
                            id: updatedInventory.foodId
                        },
                        city: {
                            ...item.city,
                            id: updatedInventory.cityId
                        }
                    }
                    : item
            )
        );
    };

    const handleDeleteInventory = async (id: string) => {
        try {
            setInventories(prev => prev.filter(item => item.id !== id));
            await inventoryService.remove(id);
            const freshList = await inventoryService.getAll();
            setInventories(freshList);
        } catch (error) {
            console.error("Error deleting inventory:", error);
            fetchInventories();
        }
    };

    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Inventory"}/>
                <AddInventory onAddInventory={handleAddInventory} />
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <Inventory
                            inventories={inventories}
                            onUpdateInventory={handleUpdateInventory}
                            onDeleteInventory={handleDeleteInventory}
                            loading={loading}
                        />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default InventoryPage;