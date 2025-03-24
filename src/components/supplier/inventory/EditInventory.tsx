import React, {useEffect, useState} from "react";
import foodService from "../../../services/foodService.ts";
import categoryService from "../../../services/categoryService.ts";
import inventoryService from "../../../services/inventoryService.ts";
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



interface EditInventoryProps {
    inventory: {
        id: string;
        price: number;
        food: IFood;
        city: ICity;
    };
    onClose: () => void;
    onUpdate: (updatedInventory: {
        id: string;
        foodId: string;
        price: number;
        cityId: string;
    }) => void;
}

const EditInventory = ({ inventory, onClose, onUpdate }: EditInventoryProps) => {
    const [foods, setFoods] = useState<IFood[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedFood, setSelectedFood] = useState(inventory.food.id);
    const [selectedCategory, setSelectedCategory] = useState(inventory.food.category.id);
    const [price, setPrice] = useState(inventory.price);
    const [cityId, setCityId] = useState(inventory.city.id);
    const [cities, setCities] = useState<ICity[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState(inventory.city.country.id);

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



    const handleSaveChanges = async () => {
        if (!selectedFood || price < 1 || !cityId) {
            return;
        }


        try {
            await inventoryService.edit(selectedFood, price, inventory.id, cityId);
            onUpdate({
                id: inventory.id,
                foodId: selectedFood,
                price,
                cityId
            });
            onClose();
        } catch (error) {
            console.error("Error updating inventory:", error);
        }
    };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2>Edit Inventory</h2>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.category}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedFood}
                    onChange={(e) => setSelectedFood(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Select a food</option>
                    {foods
                        .filter((food) => food.category.id === selectedCategory)
                        .map((food) => (
                            <option key={food.id} value={food.id}>
                                {food.food}
                            </option>
                        ))}
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    style={inputStyle}
                />
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    style={inputStyle}
                >
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.country}
                        </option>
                    ))}
                </select>
                <select
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    style={inputStyle}
                >
                    <option value="">Select a City</option>
                    {cities
                        .filter((city) => city.country.id === selectedCountry)
                        .map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.city}
                            </option>
                        ))}
                </select>
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
    marginRight: "0.5rem",
    marginLeft: "0.5rem",
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

export default EditInventory;