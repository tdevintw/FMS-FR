import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import foodService from "../../../services/foodService.ts";
import buildingService from "../../../services/buildingService.ts";
import inventoryService from "../../../services/inventoryService.ts";
import CountryService from "../../../services/countryService.ts";
import CityService from "../../../services/cityService.ts";

interface FoodItem {
    id: string;
    imageUrl: string;
    food: string;
    category: { id: string, category: string, imageUrl: string };

}

interface IInventory {
    id: string,
    price: number,
    food: {
        id: string,
        food: string,
        imageUrl: string,
        category: { id: string, category: string, imageUrl: string };
    },
    city: ICity,
    supplier: IUser
}

interface IUser {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface IBuilding {
    id: string;
    name: string;
    city: ICity;
    buildingType: string;
    manager: IUser;
    address: string;
}

interface ICity {
    id: string;
    city: string;
    country: ICountry;
}

interface ICountry {
    id: string,
    country: string
}

const OrderFood = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [food, setFood] = useState<FoodItem | null>(null);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);
    const [buildings, setBuildings] = useState<IBuilding[]>([]);
    const [inventories, setInventories] = useState<IInventory[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedInventory, setSelectedInventory] = useState<IInventory | null>(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [number, setNumber] = useState(1);
    const [price, setPrice] = useState<number | null>(null);
    const [originalInventories, setOriginalInventories] = useState<IInventory[]>([]);
    const FoodService = foodService;
    const BuildingService = buildingService;
    const InventoryService = inventoryService;
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


    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cityList = await CityService.getAll();
                // Explicitly typing the `city` object inside the filter method
                const cities = cityList.filter((city: ICity) => city.country.id === selectedCountry);
                setCities(cities);
            } catch (error) {
                console.error("Error fetching food item:", error);
            }
        };
        fetchCities();
    }, [selectedCountry]);




    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const buildingList = await BuildingService.getAll();
                setBuildings(buildingList);
            } catch (error) {
                console.error("Error fetching building item:", error);
            }
        };




        const fetchInventoriesWithFood = async () => {
            if (id) {
                try {
                    const inventoriesList = await InventoryService.getAllOfAFood(id);
                    setOriginalInventories(inventoriesList); // Store the original list
                    setInventories(inventoriesList); // Initialize the filtered list
                } catch (error) {
                    console.error("Error fetching inventories List item:", error);
                }
            }
        };
        const fetchCountries = async () => {
            if (id) {
                try {
                    const countriesList = await CountryService.getAll();
                    setCountries(countriesList);
                } catch (error) {
                    console.error("Error fetching countries List item:", error);
                }
            }

        };


        fetchCountries();
        fetchInventoriesWithFood();
        fetchBuildings();
    }, []);

    useEffect(() => {
        setSelectedCity("");
        setInventories(originalInventories);
    }, [selectedCountry]);


    const handleSelectedCity = (id: string) => {
        setSelectedCity(id);
        if (id) {
            const filteredInventories = originalInventories.filter(inventory => inventory.city.id === id);
            setInventories(filteredInventories);
        } else {
            setInventories(originalInventories);
        }
    };



    const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = inventories.find(inv => inv.id === e.target.value) || null;
        setSelectedInventory(selected);
        setNumber(1);
        setPrice(selected ? selected.price : null);
    };


    const onUpdatePlus = () => {
        if (selectedInventory && number < 101) {
            setNumber(prev => prev + 1);
            setPrice(prev => (prev !== null ? prev + selectedInventory.price : selectedInventory.price));
        }
    };

    const onUpdateMinus = () => {
        if (selectedInventory && number > 1) {
            setNumber(prev => prev - 1);
            setPrice(prev => (prev !== null ? prev - selectedInventory.price : selectedInventory.price));
        }
    };
    return (
        <div className="single-product-main-area mb-30">
            <div className="container container-default custom-area">
                <div className="row">
                    <div className="col-lg-12 col-custom mb-4">
                        <div className="border p-4 rounded bg-light">
                            <h3 className="mb-3">Order Details</h3>
                            <div className="row">
                                {/* Supplier Dropdown */}
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Supplier</label>
                                    <select className="form-select" onChange={handleSupplierChange}>
                                        <option value="">Select Supplier</option>
                                        {inventories.map(inventory => (
                                            <option key={inventory.id} value={inventory.id}>
                                                {inventory.supplier.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Country</label>
                                    <select
                                        className="form-select"
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((country) => (
                                            <option value={country.id}>
                                                {country.country}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className="form-label">City</label>
                                    <select
                                        className="form-select"
                                        value={selectedCity}
                                        onChange={(e)=>handleSelectedCity(e.target.value)}
                                        disabled={!selectedCountry}
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option value={city.id}>
                                                {city.city}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Building</label>
                                    <select
                                        className="form-select"
                                        value={selectedBuilding}
                                        onChange={(e) => setSelectedBuilding(e.target.value)}
                                    >
                                        <option value="">Select Building</option>
                                        {buildings.map((building) => (
                                            <option value={building.id}>
                                                {building.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-custom">
                        <div className="product-details-img horizontal-tab">
                            <div className="product-slider popup-gallery product-details_slider">
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
                                {price !== null && <span className="regular-price">{price} Dhs</span>}
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
