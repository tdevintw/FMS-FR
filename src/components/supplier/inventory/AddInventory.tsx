import { useEffect, useState } from "react";
import foodService from "../../../services/foodService.ts";
import inventoryService from "../../../services/inventoryService.ts";
import categoryService from "../../../services/categoryService.ts";
import cityService from "../../../services/cityService.ts";
import countryService from "../../../services/countryService.ts";


interface ICategory{
    id: string,
    category: string,
    imageUrl: string
}


interface IFood{
    id: string,
    food: string,
    imageUrl: string,
    category: ICategory;
}

interface ICity{

    id: string;
    city: string;
    country: ICountry

}

interface ICountry{
    id: string;
    country: string
}

interface AddInventoryProps {
    onAddInventory: (inventory: {
        id: string;
        price: number;
        user: {
            id: string,
            username: string,
            email: string,
            role: string
        };
        food: IFood;
        city: ICity;
    }) => void;
}

const AddInventory = ({ onAddInventory }: AddInventoryProps) => {
    const [showModal, setShowModal] = useState(false);
    const [price, setPrice] = useState(0);
    const [foodId, setFoodId] = useState("");
    const [foods, setFoods] = useState<IFood[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [cityId, setCityId] = useState("");
    const [cities, setCities] = useState<ICity[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    foodList,
                    categoryList,
                    cityList,
                    countryList
                ] = await Promise.all([
                    foodService.getAll(),
                    categoryService.getAll(),
                    cityService.getAll(),
                    countryService.getAll()
                ]);

                setFoods(foodList);
                setCategories(categoryList);
                setCities(cityList);
                setCountries(countryList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredCities = selectedCountry
        ? cities.filter((city) => city.country.id === selectedCountry)
        : [];

    const filteredFoods = selectedCategory
        ? foods.filter((food) => food.category.id === selectedCategory)
        : foods;

    const handleAddInventory = async () => {
        if (!foodId.trim() || price <= 0 || !cityId) {
            return;
        }


        try {
            const response = await inventoryService.add(foodId, price, cityId);
            const selectedFood = foods.find(f => f.id === foodId);
            const selectedCity = cities.find(c => c.id === cityId);

            if (selectedFood && selectedCity) {
                onAddInventory({
                    ...response,
                    food: selectedFood,
                    city: selectedCity
                });
            }

            setShowModal(false);
            setPrice(0);
            setFoodId("");
            setCityId("");
            setSelectedCountry("");
            setSelectedCategory("");
        } catch (err) {
            console.error("Error adding inventory:", err);
        }
    };


    return (
        <div style={{ display: "flex", justifyContent: "end" }}>
            <button
                style={{
                    backgroundColor: "#13aa52",
                    border: "1px solid #13aa52",
                    borderRadius: "4px",
                    boxShadow: "rgba(0, 0, 0, .1) 0 2px 4px 0",
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
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "30rem",
                            marginRight: "0.5rem",
                            marginLeft: "0.5rem",
                            textAlign: "center",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ marginBottom: "2rem" }}>Add Inventory</h2>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={foodId}
                            onChange={(e) => setFoodId(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            <option value="">Select a food</option>
                            {filteredFoods.map((food) => (
                                <option key={food.id} value={food.id}>
                                    {food.food}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            placeholder="Price"
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                            }}
                            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                        />
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.country}
                                </option>
                            ))}
                        </select>
                        <select
                            value={cityId}
                            onChange={(e) => setCityId(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            <option value="">Select a City</option>
                            {filteredCities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.city}
                                </option>
                            ))}
                        </select>

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                            <button
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    backgroundColor: "#13aa52",
                                    color: "white",
                                }}
                                onClick={handleAddInventory}
                            >
                                Add
                            </button>
                            <button
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    backgroundColor: "#d9534f",
                                    color: "white",
                                }}
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

export default AddInventory;
