import React from "react";

interface ProductCardProps {
    image1: string;
    image2: string;
    title: string;
    price: number;
    oldPrice?: number;
    soldOut?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ image1, image2, title, price, oldPrice, soldOut }) => {
    return(
        <div className="single-product position-relative">
            <div className="product-image">
                <a className="d-block" href="product-details.html">
                    <img src={image1} alt="" className="product-image-1 w-100" />
                    <img src={image2} alt="" className="product-image-2 position-absolute w-100" />
                </a>
            </div>
            {soldOut && (
                <div className="label-product">
                    <span className="label-sale position-absolute text-uppercase text-white text-center d-block">Soldout</span>
                </div>
            )}
            <div className="product-content">
                <div className="product-rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <div className="product-title">
                    <h4 className="title-2"> <a href="product-details.html">{title}</a></h4>
                </div>
                <div className="price-box">
                    <span className="regular-price ">${price}</span>
                    {oldPrice && <span className="old-price"><del>${oldPrice}</del></span>}
                </div>
            </div>
            <div className="add-action d-flex position-absolute">
                <a href="cart.html" title="Add To cart">
                    <i className="ion-bag"></i>
                </a>
                <a href="compare.html" title="Compare">
                    <i className="ion-ios-loop-strong"></i>
                </a>
                <a href="wishlist.html" title="Add To Wishlist">
                    <i className="ion-ios-heart-outline"></i>
                </a>
                <a href="#exampleModalCenter" data-bs-toggle="modal" title="Quick View">
                    <i className="ion-eye"></i>
                </a>
            </div>
        </div>
    );
};

export default ProductCard;