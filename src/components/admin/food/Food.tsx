import { useState, useEffect } from "react";
import EditFood from "./EditFood";
import FoodService from "../../../services/foodService.ts";

interface FoodItem {
    id: string;
    imageUrl: string;
    food: string;
    category: { id: string; category: string; imageUrl: string };
}

const Food = () => {
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const foodList = await FoodService.getAll();
                setFoods(foodList);
            } catch (error) {
                console.error("Error fetching foods:", error);
            }
        };
        fetchFoods();
    }, []);

    const handleUpdate = (updatedFood: { id: string; food: string; categoryId: string; imageUrl: string }) => {
        setFoods((prevFoods) =>
            prevFoods.map((food) =>
                food.id === updatedFood.id
                    ? {
                        ...food,
                        food: updatedFood.food,
                        category: {
                            id: updatedFood.categoryId,
                            category: food.category.category,
                            imageUrl: updatedFood.imageUrl
                        }
                    }
                    : food
            )
        );
        setSelectedFood(null);
    };

    const handleRemove = async (id: string) => {
        try {
            await FoodService.remove(id);
            setFoods((prevFoods) => prevFoods.filter(food => food.id !== id));
        } catch (error) {
            console.error("Error removing food:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light text-center">
                    <tr>
                        <th style={{ width: "20rem" }}>Image</th>
                        <th>Food</th>
                        <th>Category</th>
                        <th style={{ width: "10rem" }}>Edit</th>
                        <th style={{ width: "10rem" }}>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {foods.map((item) => (
                        <tr key={item.id} className="text-center align-middle">
                            <td>
                                <img  style={{ width: "7rem" }} src={item.imageUrl} alt={item.food} />
                            </td>
                            <td>{item.food}</td>
                            <td>{item.category.category}</td>
                            <td>
                                <img

                                    style={{ width: "2.2rem"  ,cursor : 'pointer'}}
                                    src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                    onClick={() => setSelectedFood(item)}
                                    alt="Edit"
                                />
                            </td>
                            <td>
                                <img
                                    style={{ width: "2.2rem" ,cursor : 'pointer'}}
                                    src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                    onClick={() => handleRemove(item.id)}
                                    alt="Delete"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedFood && (
                <EditFood
                    food={selectedFood}
                    onClose={() => setSelectedFood(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default Food;
