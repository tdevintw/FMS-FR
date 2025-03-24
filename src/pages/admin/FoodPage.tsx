import { useState, useEffect } from 'react';
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import Food from "../../components/admin/food/Food.tsx";
import AddFood from "../../components/admin/food/AddFood.tsx";
import foodService from "../../services/foodService.ts";

interface FoodItem {
    id: string;
    food: string;
    imageUrl: string;
    category: {
        id: string;
        category: string;
        imageUrl: string;
    };
}

const FoodPage = () => {
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchFoods = async () => {
        try {
            setLoading(true);
            const foodList = await foodService.getAll();
            setFoods(foodList);
        } catch (error) {
            console.error("Error fetching foods:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    const handleAddFood = (newFood: {
        id: string;
        food: string;
        imageUrl: string;
        category: { id: string; category: string ,imageUrl?: string};
    }) => {
        setFoods(prevFoods => [...prevFoods, {
            ...newFood,
            category: {
                ...newFood.category,
                imageUrl: ''
            }
        }]);
    };

    const handleUpdateFood = (updatedFood: {
        id: string;
        food: string;
        categoryId: string;
        imageUrl: string
    }) => {
        setFoods(prevFoods =>
            prevFoods.map(food =>
                food.id === updatedFood.id
                    ? {
                        ...food,
                        food: updatedFood.food,
                        category: {
                            ...food.category,
                            id: updatedFood.categoryId
                        },
                        imageUrl: updatedFood.imageUrl
                    }
                    : food
            )
        );
    };

    const handleDeleteFood = async (id: string) => {
        try {
            setFoods(prevFoods => prevFoods.filter(food => food.id !== id));
            await foodService.remove(id);
            const freshList = await foodService.getAll();
            setFoods(freshList);
        } catch (error) {
            console.error("Error deleting food:", error);
            fetchFoods();
        }
    };

    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Food"}/>
                <AddFood onAddFood={handleAddFood} />
                <div className="cart-main-wrapper mt-no-text mb-no-text">
                    <div className="container container-default-2 custom-area">
                        <div className="row mx-5">
                            <div className="col-lg-12">
                                <div className="cart-table table-responsive">
                                    <div className="container container-default-2 custom-area d-flex justify-content-center text-center">
                                        <Food
                                            foods={foods}
                                            onUpdateFood={handleUpdateFood}
                                            onDeleteFood={handleDeleteFood}
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default FoodPage;