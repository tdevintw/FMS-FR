import { useState, useEffect } from "react";
import EditFood from "./EditFood";
import FoodService from "../../../services/foodService.ts";

interface FoodItem {
    id: string;
    imageUrl: string;
    food: string;
    category:  {id : string , category:string , imageUrl:string};
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

    const handleEdit = (food: FoodItem) => {
        setSelectedFood(food);
    };

    const handleUpdate = (updatedFood: { id: string; food: string; categoryId: string; imageUrl: string }) => {
        setFoods((prevFoods) =>
            prevFoods.map((food) =>
                food.id === updatedFood.id
                    ? { ...food, food: updatedFood.food, categoryDTO: { id: updatedFood.categoryId, category: food.category.category, imageUrl: updatedFood.imageUrl } }
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
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-3" style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }}>Image</th>
                    <th className="p-3 w-25" style={{ textAlign: "center", border: "1px solid gray" }}>Food</th>
                    <th className="p-3 w-25" style={{ textAlign: "center", border: "1px solid gray" }}>Category</th>
                    <th className="p-3" style={{ textAlign: "center", border: "1px solid gray" }}>Edit</th>
                    <th className="p-3" style={{ textAlign: "center", border: "1px solid gray" }}>Remove</th>
                </tr>
                </thead>
                <tbody>
                {foods.map((item) => (
                    <tr key={item.id} className="border-t">
                        <td className="p-3 text-center" style={{ border: "1px solid gray" }}>
                            <img style={{ width: "7rem" }} src={item.imageUrl} alt={item.food} />
                        </td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>{item.food}</td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>{item.category.category}</td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => handleEdit(item)}
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center" style={{ border: "1px solid gray", width: "10rem" }}>
                            <img
                                style={{ width: "2.2rem", cursor: "pointer" }}
                                src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                onClick={() => handleRemove(item.id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

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
