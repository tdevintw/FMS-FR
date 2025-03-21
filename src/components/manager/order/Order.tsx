import {useEffect, useState} from "react";
import foodService from "../../../services/foodService.ts";
import categoryService from "../../../services/categoryService.ts";
import {Link} from "react-router-dom";

interface FoodItem {
    id: string;
    imageUrl: string;
    food: string;
    category: { id: string, category: string, imageUrl: string };
}

interface CategoryItem {
    id: string,
    category: string,
    imageUrl: string
}


const Order = () => {

    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const FoodService = foodService;
    const CategoryService = categoryService;
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedFood, setSelectedFood] = useState("");

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const foodList = await FoodService.getAll();
                setFoods(foodList);
            } catch (error) {
                console.error("Error fetching foods:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoryList = await CategoryService.getAll();
                setCategories(categoryList);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchFoods()
        fetchCategories();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };


    const filteredFoods = foods.filter(food => {
        if (selectedCategory && selectedFood) {
            return food.category.id === selectedCategory && food.food.toLowerCase().includes(selectedFood.toLowerCase());
        } else if (selectedCategory) {
            return food.category.id === selectedCategory;
        } else if (selectedFood) {
            return food.food.toLowerCase().includes(selectedFood.toLowerCase());
        }
        return true;
    });



    return (
        <div className="shop-main-area shop-fullwidth">
            <div className="container container-default custom-area">
                <div className="row flex-row-reverse">
                    <div className="col-12 col-custom widget-mt">
                        <div className="shop_toolbar_wrapper justify-content-between gap-2">
                            <div>
                                <input
                                    type={"text"}
                                    placeholder={"Search Food"} style={{borderColor: '1px solid gray'}}
                                    onChange={(e) => setSelectedFood(e.target.value)}

                                />
                            </div>
                            <div className="shop-select">
                                <form className="d-flex flex-column w-100" action="#">
                                    <div className="form-group">
                                        <select className="form-control nice-select w-100" onChange={handleChange}
                                                style={{textAlign: "center", cursor: 'pointer'}}>
                                            <option selected value="">Select Category</option>
                                            {categories.map(item => (
                                                <option value={item.id}>{item.category}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="row shop_wrapper grid_4">
                            {filteredFoods.map((item) => (
                                <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-6 col-custom product-area">
                                    <div className="single-product position-relative">
                                        <div className="product-image">
                                            <Link className="d-block" to={`food/${item.id}`} style={{
                                                display: 'block',
                                                position: 'relative',
                                                width: '100%',
                                                height: '250px',
                                                overflow: 'hidden'
                                            }}>
                                                <img style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center'
                                                }} src={item.imageUrl} alt=""
                                                     className="product-image-1 w-100"/>
                                                <img style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center'
                                                }} src={item.category.imageUrl} alt=""
                                                     className="product-image-2 position-absolute w-100"/>
                                            </Link>
                                        </div>
                                        <div className="product-content" style={{paddingTop: '20px'}}>
                                            <div className="product-title">
                                                <h4 className="title-2"><a href="product-details.html">{item.food}</a>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="row">
                            <div className="col-sm-12 col-custom">
                                <div className="toolbar-bottom mt-30">
                                    <nav className="pagination pagination-wrap mb-10 mb-sm-0">
                                        <ul className="pagination">
                                            <li className="disabled prev">
                                                <i className="ion-ios-arrow-thin-left"></i>
                                            </li>
                                            <li className="active"><a>1</a></li>
                                            <li>
                                                <a href="#">2</a>
                                            </li>
                                            <li className="next">
                                                <a href="#" title="Next >>"><i className="ion-ios-arrow-thin-right"></i></a>
                                            </li>
                                        </ul>
                                    </nav>
                                    <p className="desc-content text-center text-sm-right">Showing 1 - 12 of 34
                                        result</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;