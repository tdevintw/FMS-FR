import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import foodService from "../../../services/foodService.ts";

interface FoodItem {
    id: string;
    imageUrl: string;
    food: string;
    category: { id: string, category: string, imageUrl: string };
}

const OrderFood = () => {
    const { id } = useParams();
    const [number, setNumber] = useState(1);
    const navigate = useNavigate();
    const [food, setFood] = useState<FoodItem | null>(null);

    const [suppliers] = useState(["Supplier A", "Supplier B", "Supplier C"]);
    const [countries] = useState(["USA", "Canada", "UK"]);
    const [cities, setCities] = useState<string[]>([]);
    const [buildings] = useState(["Building 1", "Building 2", "Building 3"]);

    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState("");

    const FoodService = foodService;

    useEffect(() => {
        if (!id) {
            navigate("/404");
        } else {
            const fetchFood = async () => {
                try {
                    const foodItem = await FoodService.getById(id);
                    setFood(foodItem);
                } catch (error) {
                    console.error("Error fetching food item:", error);
                }
            };

            fetchFood();
        }
    }, [id, navigate]);

    // Update cities based on selected country
    useEffect(() => {
        const cityMap: { [key: string]: string[] } = {
            USA: ["New York", "Los Angeles", "Chicago"],
            Canada: ["Toronto", "Vancouver", "Montreal"],
            UK: ["London", "Manchester", "Liverpool"],
        };
        setCities(cityMap[selectedCountry] || []);
    }, [selectedCountry]);

    const onUpdatePlus = () => number < 101 && setNumber(number + 1);
    const onUpdateMinus = () => number > 1 && setNumber(number - 1);

    return (
        <div className="single-product-main-area mb-30">
            <div className="container container-default custom-area">
                <div className="row">
                    <div className="col-lg-12 col-custom mb-4">
                        {/* New dropdowns section */}
                        <div className="border p-4 rounded bg-light">
                            <h3 className="mb-3">Order Details</h3>
                            <div className="row">
                                {/* Supplier Dropdown */}
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Supplier</label>
                                    <select
                                        className="form-select"
                                        value={selectedSupplier}
                                        onChange={(e) => setSelectedSupplier(e.target.value)}
                                    >
                                        <option value="">Select Supplier</option>
                                        {suppliers.map((supplier) => (
                                            <option key={supplier} value={supplier}>
                                                {supplier}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Country Dropdown */}
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Country</label>
                                    <select
                                        className="form-select"
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* City Dropdown */}
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">City</label>
                                    <select
                                        className="form-select"
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        disabled={!selectedCountry}
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Building Dropdown */}
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Building</label>
                                    <select
                                        className="form-select"
                                        value={selectedBuilding}
                                        onChange={(e) => setSelectedBuilding(e.target.value)}
                                    >
                                        <option value="">Select Building</option>
                                        {buildings.map((building) => (
                                            <option key={building} value={building}>
                                                {building}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Keep the original layout intact */}
                    <div className="col-lg-5 col-custom">
                        <div className="product-details-img horizontal-tab">
                            <div className="product-slider popup-gallery product-details_slider">
                                {/* Image remains unchanged */}
                            </div>
                            <div className="pd-slider-nav product-slider">
                                <div className="single-thumb border">
                                    <img src={food?.imageUrl} alt="Product"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 col-custom">
                        <div className="product-summery position-relative">
                            <div className="product-head mb-3">
                                <h2 className="product-title">{food?.food}</h2>
                            </div>
                            <div className="price-box mb-2">
                                <span className="regular-price">$80.00</span>
                            </div>
                            <div className="quantity-with_btn mb-4">
                                <div className="quantity">
                                    <div className="cart-plus-minus">
                                        <input className="cart-plus-minus-box" value={number} type="text"/>
                                        <div onClick={onUpdateMinus} className="dec qtybutton">-</div>
                                        <div onClick={onUpdatePlus} className="inc qtybutton">+</div>
                                    </div>
                                </div>
                                <div className="add-to_cart">
                                    <a className="btn obrien-button primary-btn" href="cart.html">Order</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrderFood;
