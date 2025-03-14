
const QuickViewModal = () => {
    return (
        <div className="modal fade obrien-modal" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <button type="button" className="close close-button" data-bs-dismiss="modal" aria-label="Close">
                        <span className="close-icon" aria-hidden="true">x</span>
                    </button>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 text-center">
                                    <div className="product-image">
                                        <img src="../src/assets/images/product/1.jpg" alt="Product Image" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="modal-product">
                                        <div className="product-content">
                                            <div className="product-title">
                                                <h4 className="title">Product dummy name</h4>
                                            </div>
                                            <div className="price-box">
                                                <span className="regular-price ">$80.00</span>
                                                <span className="old-price"><del>$90.00</del></span>
                                            </div>
                                            <div className="product-rating">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-o"></i>
                                                <i className="fa fa-star-o"></i>
                                                <span>1 Review</span>
                                            </div>
                                            <p className="desc-content">we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame bel...</p>
                                            <form className="d-flex flex-column w-100" action="#">
                                                <div className="form-group">
                                                    <select className="form-control nice-select w-100">
                                                        <option>S</option>
                                                        <option>M</option>
                                                        <option>L</option>
                                                        <option>XL</option>
                                                        <option>XXL</option>
                                                    </select>
                                                </div>
                                            </form>
                                            <div className="quantity-with_btn">
                                                <div className="quantity">
                                                    <div className="cart-plus-minus">
                                                        <input className="cart-plus-minus-box" value="0" type="text" />
                                                        <div className="dec qtybutton">-</div>
                                                        <div className="inc qtybutton">+</div>
                                                    </div>
                                                </div>
                                                <div className="add-to_cart">
                                                    <a className="btn obrien-button primary-btn" href="cart.html">Add to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;