import { useState, useEffect } from "react";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import Category from "../../components/admin/category/Category.tsx";
import { DashboardHeader } from "../../components/admin/DashboardHeader.tsx";
import AddCategory from "../../components/admin/category/AddCategory.tsx";
import categoryService from "../../services/categoryService.ts";

interface ICategory {
    id: string;
    category: string;
    imageUrl: string;
}

const CategoryPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const { getAll } = categoryService;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryList = await getAll();
                setCategories(categoryList);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = (newCategory: ICategory) => {
        setCategories(prev => [...prev, newCategory]);
    };

    const handleUpdateCategory = (updatedCategory: ICategory) => {
        setCategories(prev =>
            prev.map(item => (item.id === updatedCategory.id ? updatedCategory : item)))};

    const handleDeleteCategory = (uuid: string) => {
        setCategories(prev => prev.filter(category => category.id !== uuid));
    };

    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Category"}/>
                <AddCategory onAddCategory={handleAddCategory} />
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <Category
                            categories={categories}
                            onUpdateCategory={handleUpdateCategory}
                            onDeleteCategory={handleDeleteCategory}
                        />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default CategoryPage;