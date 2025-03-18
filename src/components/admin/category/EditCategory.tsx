import React, { useState } from "react";

interface EditCategoryProps {
    category: { id: number; title: string; image: string };
    onClose: () => void;
    onUpdate: (category: { id: number; title: string; image: string }) => void;
}

const EditCategory = ({ category, onClose, onUpdate }: EditCategoryProps) => {
    const [categoryName, setCategoryName] = useState(category.title);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Modal Styles
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSaveChanges = () => {
        // Include the `id` when updating
        onUpdate({
            id: category.id,  // Make sure to include the `id`
            title: categoryName,
            image: selectedFile ? URL.createObjectURL(selectedFile) : category.image,
        });
        onClose(); // Close modal after save
    };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ marginBottom: "2rem" }}>Edit Category</h2>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={fileInputStyle}
                />
                {selectedFile && <p>{selectedFile.name}</p>}

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

export default EditCategory;
