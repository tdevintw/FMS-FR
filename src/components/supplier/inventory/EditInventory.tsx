import {useEffect, useState} from "react";
import foodService from "../../../services/foodService.ts";
import categoryService from "../../../services/categoryService.ts";
import inventoryService from "../../../services/inventoryService.ts";

interface EditInventoryProps {
    inventory: {
        id: string,
        price: number,
        food: {
            id: string,
            food: string,
            imageUrl: string,
            category: { id: string, category: string, imageUrl: string };
        };
    };
    onClose: () => void;
}

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

const EditInventory = ({inventory, onClose}: EditInventoryProps) => {
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedFood, setSelectedFood] = useState<string>(inventory.food.id);
    const [selectedCategory, setSelectedCategory] = useState<string>(inventory.food.category.id);
    const [price, setPrice] = useState<number>(inventory.price);
    const InventoryService = inventoryService;

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
    const handleSaveChanges = async  () => {
       if(!selectedFood || price<1 ){
           alert("Food is required and price must be at least 1");
       }
        await InventoryService.edit(selectedFood , price ,inventory.id );
        onClose();
    };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2>Edit Inventory</h2>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.category}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedFood}
                    onChange={(e) => setSelectedFood(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Select a food</option>
                    {foods
                        .filter((food) => food.category.id === selectedCategory)
                        .map((food) => (
                            <option key={food.id} value={food.id}>
                                {food.food}
                            </option>
                        ))}
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    style={inputStyle}
                />

                <div style={actionsStyle}>
                    <button style={saveButtonStyle} onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                    <button style={cancelButtonStyle} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const modalOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const modalContentStyle: React.CSSProperties = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "30rem",
    marginRight: "0.5rem",
    marginLeft: "0.5rem",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
};

const actionsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
};

const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
};

const saveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#13aa52",
    color: "white",
};

const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#d9534f",
    color: "white",
};

export default EditInventory;