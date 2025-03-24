import React, { useState } from "react";
import CategoryService from "../../../services/categoryService.ts";

interface AddCategoryProps {
    onAddCategory: (category: { id: string; category: string; imageUrl: string }) => void;
}

const AddCategory = ({ onAddCategory }: AddCategoryProps) => {
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleAddCategory = async () => {
        if (!categoryName || !selectedFile) {
            alert("Please provide a category name and an image.");
            return;
        }

        setLoading(true);
        try {
            const newCategory = await CategoryService.add(categoryName, selectedFile);
            onAddCategory(newCategory); // Call parent function with new category
            setShowModal(false);
            setCategoryName("");
            setSelectedFile(null);
        } catch (error) {
            alert("Failed to add category.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "end" }}>
            <button
                style={{
                    backgroundColor: "#13aa52",
                    border: "1px solid #13aa52",
                    borderRadius: "4px",
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
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    background: "rgba(0, 0, 0, 0.5)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                }} onClick={() => setShowModal(false)}>
                    <div style={{
                        background: "white", padding: "20px", borderRadius: "8px",
                        width: "30rem", textAlign: "center",
                    }} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '2rem' }}>Add Category</h2>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            style={{
                                width: "100%", padding: "10px", margin: "10px 0",
                                border: "1px solid #ccc", borderRadius: "4px",
                            }}
                        />
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {selectedFile && <p>{selectedFile.name}</p>}

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                            <button
                                style={{ padding: "10px 20px", backgroundColor: "#13aa52", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                onClick={handleAddCategory}
                                disabled={loading}
                            >
                                {loading ? "Adding..." : "Add"}
                            </button>
                            <button
                                style={{ padding: "10px 20px", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
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

export default AddCategory;
