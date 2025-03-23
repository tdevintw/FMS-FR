import { useEffect, useState } from "react";
import EditCategory from "./EditCategory";
import CategoryService from "../../../services/categoryService.ts";

interface ICategory {
    id: string;
    category: string;
    imageUrl: string;
}

const Category = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const { getAll, remove } = CategoryService;
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryList: ICategory[] = await getAll();
                console.log(categoryList);
                setCategories(categoryList);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleUpdateCategory = (updatedCategory: ICategory) => {
        setCategories(categories.map(item => (item.id === updatedCategory.id ? updatedCategory : item)));
        setEditModalOpen(false);
    };

    const handleDeleteCategory = async (uuid: string) => {
        try {
            await remove(uuid);
            setCategories(categories.filter(category => category.id !== uuid));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light text-center">
                    <tr>
                        <th style={{ width: "20rem" }}>Image</th>
                        <th>Category</th>
                        <th style={{ width: "10rem" }}>Edit</th>
                        <th style={{ width: "10rem" }}>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((item) => (
                        <tr key={item.id} className="text-center align-middle">
                            <td>
                                <img style={{ width: "7rem" }} src={item.imageUrl} alt={item.category} />
                            </td>
                            <td>{item.category}</td>
                            <td>
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                    onClick={() => {
                                        setSelectedCategory(item);
                                        setEditModalOpen(true);
                                    }}
                                    alt="Edit"
                                />
                            </td>
                            <td>
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    onClick={() => handleDeleteCategory(item.id)}
                                    src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                    alt="Delete"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {editModalOpen && selectedCategory && (
                <EditCategory
                    category={selectedCategory}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={handleUpdateCategory}
                />
            )}
        </div>
    );
};

export default Category;
