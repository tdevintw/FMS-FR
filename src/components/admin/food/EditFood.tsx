import React, { useState } from "react";

interface EditFoodProps {
    food: { id: number; title: string; image: string; category: string };
    onClose: () => void;
    onUpdate: (food: { id: number; title: string; image: string; category: string }) => void;
}

const EditFood = ({ food, onClose, onUpdate }: EditFoodProps) => {
    const [foodName, setFoodName] = useState(food.title);
    const [category, setCategory] = useState(food.category);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSaveChanges = () => {
        onUpdate({
            id: food.id,
            title: foodName,
            category: category,
            image: selectedFile ? URL.createObjectURL(selectedFile) : food.image,
        });
        onClose();
    };

    return (
        <div
            style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={onClose}
        >
            <div
                style={{ background: "white", padding: "20px", borderRadius: "8px", width: "30rem", textAlign: "center", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ marginBottom: "2rem" }}>Edit Food</h2>
                <input
                    type="text"
                    placeholder="Food Name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    style={{ width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ width: "100%", margin: "10px 0", cursor: "pointer" }}
                />
                {selectedFile && <p>{selectedFile.name}</p>}

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                    <button style={{ padding: "10px 20px", border: "none", borderRadius: "4px", backgroundColor: "#13aa52", color: "white", cursor: "pointer", fontSize: "16px" }} onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                    <button style={{ padding: "10px 20px", border: "none", borderRadius: "4px", backgroundColor: "#d9534f", color: "white", cursor: "pointer", fontSize: "16px" }} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditFood;
