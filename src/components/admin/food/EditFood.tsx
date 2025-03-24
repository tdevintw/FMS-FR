import React, { useState, useEffect } from "react";
import FoodService from "../../../services/foodService.ts";
import CategoryService from "../../../services/categoryService.ts";

interface EditFoodProps {
    food: {
        id: string;
        food: string;
        imageUrl: string;
        category: {
            id: string;
            category: string;
            imageUrl?: string;
        };
    };
    onClose: () => void;
    onUpdate: (food: {
        id: string;
        food: string;
        categoryId: string;
        imageUrl: string;
    }) => void;
}

const EditFood = ({ food, onClose, onUpdate }: EditFoodProps) => {
    const [foodName, setFoodName] = useState(food.food);
    const [categoryId, setCategoryId] = useState(food.category.id);
    const [categories, setCategories] = useState<{ id: string; category: string }[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryList = await CategoryService.getAll();
                setCategories(categoryList);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleSaveChanges = async () => {
        await FoodService.edit(foodName, categoryId, selectedFile, food.id);
        onUpdate({
            id: food.id,
            food: foodName,
            categoryId,
            imageUrl: selectedFile ? selectedFile.name : food.imageUrl
        });
        onClose();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
            <div style={{
                background: "white", padding: "20px", borderRadius: "8px", width: "30rem", textAlign: "center", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ marginBottom: "2rem" }}>Edit Food</h2>
                <input
                    type="text"
                    placeholder="Food Name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    style={{
                        width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px"
                    }}
                />
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{
                        width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px", cursor: "pointer"
                    }}
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.category}</option>
                    ))}
                </select>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                        width: "100%", margin: "10px 0", cursor: "pointer"
                    }}
                />
                {selectedFile && <p>{selectedFile.name}</p>}
                <div style={{
                    display: "flex", justifyContent: "space-between", marginTop: "15px"
                }}>
                    <button
                        style={{
                            padding: "10px 20px", border: "none", borderRadius: "4px", backgroundColor: "#13aa52", color: "white", cursor: "pointer", fontSize: "16px"
                        }}
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                    <button
                        style={{
                            padding: "10px 20px", border: "none", borderRadius: "4px", backgroundColor: "#d9534f", color: "white", cursor: "pointer", fontSize: "16px"
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditFood;
