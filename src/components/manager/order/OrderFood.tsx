import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import foodService from "../../../services/foodService.ts";


interface FoodItem {
    id: string;
    imageUrl: string;
    food: string;
    category: { id: string, category: string, imageUrl: string };
}


const OrderFood = () => {


    const {id} = useParams();
    const [number, setNumber] = useState(1);
    const navigate = useNavigate();
    const [food, setFood] = useState<FoodItem | null>(null);
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


    const onUpdatePlus = () => {
        if (number < 101) setNumber(number + 1);
    }

    const onUpdateMinus = () => {
        if (number > 1) setNumber(number - 1);
    }

    return (
        <div className="single-product-main-area mb-30">
            <div className="container container-default custom-area">
                <div className="row">
                    <div className="col-lg-5 col-custom">
                        <div className="product-details-img horizontal-tab">
                            <div className="product-slider popup-gallery product-details_slider" data-slick-options='{
                        "slidesToShow": 1,
                        "arrows": false,
                        "fade": true,
                        "draggable": false,
                        "swipe": false,
                        "asNavFor": ".pd-slider-nav"
                        }'>


                            </div>
                            <div className="pd-slider-nav product-slider" data-slick-options='{
                        "slidesToShow": 4,
                        "asNavFor": ".product-details_slider",
                        "focusOnSelect": true,
                        "arrows" : false,
                        "spaceBetween": 30,
                        "vertical" : false
                        }' data-slick-responsive='[
                            {"breakpoint":1501, "settings": {"slidesToShow": 4}},
                            {"breakpoint":1200, "settings": {"slidesToShow": 4}},
                            {"breakpoint":992, "settings": {"slidesToShow": 4}},
                            {"breakpoint":575, "settings": {"slidesToShow": 3}}
                        ]'>
                                <div className="single-thumb border">
                                    <img
                                        src={food?.imageUrl}
                                        alt="Product"/>
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