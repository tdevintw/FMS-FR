import React from "react";
import ProductCard from "./ProductCard.tsx";

interface ProductSectionProps {
    title: string;
    description: string;

}

const ProductSection: React.FC<ProductSectionProps> = ({ title, description }) => {
    return (
        <div className="product-area mt-text">
            <div className="container container-default custom-area">
                <div className="row">
                    <div className="col-lg-5 m-auto text-center col-custom">
                        <div className="section-content">
                            <h2 className="title-1 text-uppercase">{title}</h2>
                            <div className="desc-content">
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 product-wrapper col-custom">
                        <div className="product-slider">
                            <div className="single-item">
                                <ProductCard
                                    image1="../src/assets/images/product/1.jpg"
                                    image2="../src/assets/images/product/2.jpg"
                                    title="Product dummy name"
                                    price={80.00}
                                    oldPrice={90.00}
                                />
                            </div>
                            <div className="single-item">
                                <ProductCard
                                    image1=".src/assets/images/product/3.jpg"
                                    image2=".src/assets/images/product/4.jpg"
                                    title="Product dummy title"
                                    price={80.00}
                                    oldPrice={90.00}
                                />
                            </div>
                            <div className="single-item">
                                <ProductCard
                                    image1=".src/assets/images/product/5.jpg"
                                    image2=".src/assets/images/product/6.jpg"
                                    title="Product dummy title"
                                    price={80.00}
                                    oldPrice={90.00}
                                    soldOut={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSection;