import React, {useEffect, useState} from "react";
import CategoryService from "../../../services/categoryService.ts";
import FoodService from "../../../services/foodService.ts";

const AddFood = () => {
    const [showModal, setShowModal] = useState(false);
    const [foodName, setFoodName] = useState("");
    const [categoryId, setCategoryId] = useState("");
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

    const handleAddFood = async () => {
        if (!foodName.trim() || !categoryId.trim() || !selectedFile) {
            alert("All fields are required.");
            return;
        }

        try {
            await FoodService.add(foodName, categoryId, selectedFile);
            setShowModal(false);
        } catch (error) {
            console.error("Error adding food:", error);
        }
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
        marginRight: '0.5rem',
        marginLeft: '0.5rem',
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
    const fileInputStyle: React.CSSProperties = {
        width: "100%",
        margin: "10px 0",
        cursor: "pointer",
    };


    const buttonStyle: React.CSSProperties = {
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    };

    const addButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "#13aa52",
        color: "white",
    };

    const cancelButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "#d9534f",
        color: "white",
    };
    const selectStyle: React.CSSProperties = {
        ...inputStyle,
        cursor: "pointer",
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <div style={{display: "flex", justifyContent: "end"}}>
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
                <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
                    <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{marginBottom: '2rem'}}>Add Category</h2>
                        <input
                            type="text" placeholder="Food Name"
                            style={inputStyle}
                            onChange={(e) => setFoodName(e.target.value)}
                        />
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            style={selectStyle}
                            className="custom-select"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>


                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={fileInputStyle}
                        />

                        {selectedFile && <p>{selectedFile.name}</p>}
                        <div style={actionsStyle}>
                            <button style={addButtonStyle}
                                    onClick={handleAddFood}
                            >Add
                            </button>
                            <button style={cancelButtonStyle} onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddFood;
