import  { useState } from "react";
import EditCategory from "./EditCategory"; // ✅ Import EditCategory component

const Category = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, image: "https://www.excelkiddzfoundation.com.ng/wp-content/uploads/2023/09/Fruits-1-1.webp", title: "Fruits" },
        { id: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQriYLnaTLPDqPpKFcjPrl4PVWTuqdeBreO8A&s", title: "Vegetables" },
    ]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<{ id: number; image: string; title: string } | null>(null);

    // Function to update category
    const handleUpdateCategory = (updatedCategory: { id: number; image: string; title: string }) => {
        setCartItems(cartItems.map(item => (item.id === updatedCategory.id ? updatedCategory : item)));
        setEditModalOpen(false);
    };

    return (
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">Image</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3 w-25">Category</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Edit</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3">Remove</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={item.id} className="border-t" style={{ border: "1px solid gray" }}>
                        <td className="p-3 text-center">
                            <img style={{ width: "7rem" }} src={item.image} alt={item.title} />
                        </td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.title}
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => { setSelectedCategory(item); setEditModalOpen(true); }} // ✅ Open Edit Modal
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img style={{ width: "2.2rem" }} src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png" />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editModalOpen && selectedCategory && (
                <EditCategory
                    category={selectedCategory}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={handleUpdateCategory} // Pass function for updating
                />
            )}
        </div>
    );
};

export default Category;
