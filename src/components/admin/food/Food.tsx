import { useState } from "react";
import EditFood from "./EditFood";

export interface FoodItem {
    id: string;
    food: string;
    imageUrl: string;
    category: {
        id: string;
        category: string;
        imageUrl?: string;
    };
}

interface FoodProps {
    foods: {
        id: string;
        food: string;
        imageUrl: string;
        category: { id: string; category: string; imageUrl?: string };
    }[];
    onUpdateFood: (food: {
        id: string;
        food: string;
        categoryId: string;
        imageUrl: string
    }) => void;
    onDeleteFood: (id: string) => void;
    loading: boolean;
}
const Food = ({ foods, onUpdateFood, onDeleteFood, loading }: FoodProps) => {
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

    return (
        <div className="container mt-4">
            {loading ? (
                <div>Loading foods...</div>
            ) : (
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
                                    <img
                                        style={{ width: "7rem" }}
                                        src={item.imageUrl}
                                        alt={item.food}
                                    />
                                </td>
                                <td>{item.food}</td>
                                <td>{item.category.category}</td>
                                <td>
                                    <img
                                        style={{ width: "2.2rem", cursor: 'pointer' }}
                                        src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                        onClick={() => setSelectedFood(item)}
                                        alt="Edit"
                                    />
                                </td>
                                <td>
                                    <img
                                        style={{ width: "2.2rem", cursor: 'pointer' }}
                                        src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                        onClick={() => onDeleteFood(item.id)}
                                        alt="Delete"
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedFood && (
                <EditFood
                    food={selectedFood}
                    onClose={() => setSelectedFood(null)}
                    onUpdate={onUpdateFood}
                />
            )}
        </div>
    );
};

export default Food;




