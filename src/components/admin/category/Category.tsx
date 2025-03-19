import {useEffect, useState} from "react";
import EditCategory from "./EditCategory";
import CategoryService from "../../../services/categoryService.ts";


interface ICategory {
    id: string;
    category: string;
    imageUrl : string;
}



const Category = () => {


    const [editModalOpen, setEditModalOpen] = useState(false);
    const {getAll, remove} = CategoryService;
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
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }} className="p-3">Image</th>
                    <th style={{ textAlign: "center", border: "1px solid gray" }} className="p-3 w-25">Category</th>
                    <th style={{ textAlign: "center", border: "1px solid gray",width:"10rem" }} className="p-3">Edit</th>
                    <th style={{ textAlign: "center", border: "1px solid gray",width:"10rem" }} className="p-3">Remove</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((item) => (
                    <tr key={item.id} className="border-t" style={{ border: "1px solid gray" }}>
                        <td className="p-3 text-center">
                            <img style={{ width: "7rem" }} src={item.imageUrl} alt={item.category} />
                        </td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>
                            {item.category}
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => { setSelectedCategory(item); setEditModalOpen(true); }}
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem" , cursor : "pointer" ,  }}
                                onClick={() => handleDeleteCategory(item.id)}
                                src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png" />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

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
