import  { useEffect, useState } from "react";
import foodService from "../../../services/foodService.ts";
import inventoryService from "../../../services/inventoryService.ts";
import categoryService from "../../../services/categoryService.ts"; // Assuming you have a category service

interface FoodItem {
    id: string;
    imageUrl: string;
    food: string;
    category: { id: string, category: string, imageUrl: string };
}

interface ICategory {
    id: string;
    category: string;
    imageUrl: string;
}

const AddInventory = () => {
    const [showModal, setShowModal] = useState(false);
    const [price, setPrice] = useState(0);
    const [foodId, setFoodId] = useState("");
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const foodList = await foodService.getAll();
                setFoods(foodList);
            } catch (error) {
                console.error("Error fetching foods:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoryList = await categoryService.getAll();
                setCategories(categoryList);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchFoods();
        fetchCategories();
    }, []);

    const filteredFoods = selectedCategory
        ? foods.filter((food) => food.category.id === selectedCategory)
        : foods;

    const handleAddInventory = async () => {
        if (!foodId.trim() || price <= 0) {
            alert("All fields are required and price must be positive.");
            return;
        }

        try {
            await inventoryService.add(foodId, price);
            setShowModal(false);
        } catch (error) {
            console.error("Error adding inventory:", error);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "end" }}>
            <button
                style={{
                    backgroundColor: "#13aa52",
                    border: "1px solid #13aa52",
                    borderRadius: "4px",
                    boxShadow: "rgba(0, 0, 0, .1) 0 2px 4px 0",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "10px 45px",
                    marginRight: "10%",
                    marginTop: "2rem",
                }}
                onClick={() => setShowModal(true)}
            >
                Add
            </button>

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "30rem",
                            marginRight: "0.5rem",
                            marginLeft: "0.5rem",
                            textAlign: "center",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ marginBottom: "2rem" }}>Add Inventory</h2>

                        {/* Category Dropdown */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={foodId}
                            onChange={(e) => setFoodId(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            <option value="">Select a food</option>
                            {filteredFoods.map((food) => (
                                <option key={food.id} value={food.id}>
                                    {food.food}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            placeholder="Price"
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                            }}
                            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        />

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                            <button
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    backgroundColor: "#13aa52",
                                    color: "white",
                                }}
                                onClick={handleAddInventory}
                            >
                                Add
                            </button>
                            <button
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    backgroundColor: "#d9534f",
                                    color: "white",
                                }}
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddInventory;
