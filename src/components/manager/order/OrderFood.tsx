
const OrderFood = () => {


    return (
        <div className="single-product-main-area">
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
                                <div className="single-image border">
                                    <a href="assets/images/product/large-size/1.jpg">
                                        <img src="assets/images/product/large-size/1.jpg" alt="Product"/>
                                    </a>
                                </div>
                                <div className="single-image border">
                                    <a href="assets/images/product/large-size/2.png">
                                        <img src="assets/images/product/large-size/2.png" alt="Product"/>
                                    </a>
                                </div>
                                <div className="single-image border">
                                    <a href="assets/images/product/large-size/3.png">
                                        <img src="assets/images/product/large-size/3.png" alt="Product"/>
                                    </a>
                                </div>
                                <div className="single-image border">
                                    <a href="assets/images/product/large-size/4.jpg">
                                        <img src="assets/images/product/large-size/4.jpg" alt="Product"/>
                                    </a>
                                </div>
                                <div className="single-image border">
                                    <a href="assets/images/product/large-size/5.png">
                                        <img src="assets/images/product/large-size/5.png" alt="Product"/>
                                    </a>
                                </div>
                                <div className="single-image border">
                                    <a href="assets/images/product/large-size/6.png">
                                        <img src="assets/images/product/large-size/6.png" alt="Product"/>
                                    </a>
                                </div>
                                <div className="single-image border">
                                    <a href="assets/images/product/large-size/7.png">
                                        <img src="assets/images/product/large-size/7.png" alt="Product"/>
                                    </a>
                                </div>
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
                                    <img src="assets/images/product/small-size/1.png" alt="Product Thumnail"/>
                                </div>
                                <div className="single-thumb border">
                                    <img src="assets/images/product/small-size/2.png" alt="Product Thumnail"/>
                                </div>
                                <div className="single-thumb border">
                                    <img src="assets/images/product/small-size/3.png" alt="Product Thumnail"/>
                                </div>
                                <div className="single-thumb border">
                                    <img src="assets/images/product/small-size/4.png" alt="Product Thumnail"/>
                                </div>
                                <div className="single-thumb border">
                                    <img src="assets/images/product/small-size/5.png" alt="Product Thumnail"/>
                                </div>
                                <div className="single-thumb border">
                                    <img src="assets/images/product/small-size/6.png" alt="Product Thumnail"/>
                                </div>
                                <div className="single-thumb border">
                                    <img src="assets/images/product/small-size/7.png" alt="Product Thumnail"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-custom">
                        <div className="product-summery position-relative">
                            <div className="product-head mb-3">
                                <h2 className="product-title">Sample product Countdown</h2>
                            </div>
                            <div className="price-box mb-2">
                                <span className="regular-price">$80.00</span>
                                <span className="old-price"><del>$90.00</del></span>
                            </div>
                            <div className="product-rating mb-3">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-o"></i>
                                <i className="fa fa-star-o"></i>
                            </div>
                            <div className="sku mb-3">
                                <span>SKU: 12345</span>
                            </div>
                            <p className="desc-content mb-5">I must explain to you how all this mistaken idea of
                                denouncing pleasure and praising pain was born and I will give you a complete account of
                                the system, and expound the actual teachings of the great explorer of the truth, the
                                master-builder of human happiness.</p>
                            <div className="quantity-with_btn mb-4">
                                <div className="quantity">
                                    <div className="cart-plus-minus">
                                        <input className="cart-plus-minus-box" value="0" type="text"/>
                                        <div className="dec qtybutton">-</div>
                                        <div className="inc qtybutton">+</div>
                                    </div>
                                </div>
                                <div className="add-to_cart">
                                    <a className="btn obrien-button primary-btn" href="cart.html">Add to cart</a>
                                    <a className="btn obrien-button-2 treansparent-color pt-0 pb-0"
                                       href="wishlist.html">Add to wishlist</a>
                                </div>
                            </div>
                            <div className="buy-button mb-5">
                                <a href="#" className="btn obrien-button-3 black-button">Buy it now</a>
                            </div>
                            <div className="social-share mb-4">
                                <span>Share :</span>
                                <a href="#"><i className="fa fa-facebook-square facebook-color"></i></a>
                                <a href="#"><i className="fa fa-twitter-square twitter-color"></i></a>
                                <a href="#"><i className="fa fa-linkedin-square linkedin-color"></i></a>
                                <a href="#"><i className="fa fa-pinterest-square pinterest-color"></i></a>
                            </div>
                            <div className="payment">
                                <a href="#"><img className="border" src="assets/images/payment/img-payment.png"
                                                 alt="Payment"/></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-no-text">
                    <div className="col-lg-12">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active text-uppercase" id="home-tab" data-bs-toggle="tab"
                                   href="#connect-1" role="tab" aria-selected="true">Description</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-uppercase" id="profile-tab" data-bs-toggle="tab"
                                   href="#connect-2" role="tab" aria-selected="false">Reviews</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-uppercase" id="contact-tab" data-bs-toggle="tab"
                                   href="#connect-3" role="tab" aria-selected="false">Shipping Policy</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-uppercase" id="review-tab" data-bs-toggle="tab"
                                   href="#connect-4" role="tab" aria-selected="false">Size Chart</a>
                            </li>
                        </ul>
                        <div className="tab-content mb-text" id="myTabContent">
                            <div className="tab-pane fade show active" id="connect-1" role="tabpanel"
                                 aria-labelledby="home-tab">
                                <div className="desc-content">
                                    <p className="mb-3">On the other hand, we denounce with righteous indignation and
                                        dislike men who are so beguiled and demoralized by the charms of pleasure of the
                                        moment, so blinded by desire, that they cannot foresee the pain and trouble that
                                        are bound to ensue; and equal blame belongs to those who fail in their duty
                                        through weakness of will, which is the same as saying through shrinking from
                                        toil and pain. These cases are perfectly simple and easy to distinguish. In a
                                        free hour, when our power of choice is untrammelled and when nothing prevents
                                        our being able to do what we like best, every pleasure is to be welcomed and
                                        every pain avoided. But in certain circumstances and owing to the claims of duty
                                        or the obligations of business it will frequently occur that pleasures have to
                                        be repudiated and annoyances accepted. The wise man therefore always holds in
                                        these matters to this principle of selection: he rejects pleasures to secure
                                        other greater pleasures, or else he endures pains to avoid worse pains.</p>
                                    <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum
                                        soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
                                        placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                                        Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus
                                        saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                                        Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
                                        voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
                                        repellat.</p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="connect-2" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="product_tab_content  border p-3">
                                    <div className="review_address_inner">
                                        <div className="pro_review mb-5">
                                            <div className="review_thumb">
                                                <img alt="review images" src="assets/images/review/1.jpg"/>
                                            </div>
                                            <div className="review_details">
                                                <div className="review_info mb-2">
                                                    <div className="product-rating mb-2">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star-o"></i>
                                                        <i className="fa fa-star-o"></i>
                                                    </div>
                                                    <h5>Admin - <span> December 19, 2020</span></h5>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in
                                                    viverra ex, vitae vestibulum arcu. Duis sollicitudin metus sed lorem
                                                    commodo, eu dapibus libero interdum. Morbi convallis viverra erat,
                                                    et aliquet orci congue vel. Integer in odio enim. Pellentesque in
                                                    dignissim leo. Vivamus varius ex sit amet quam tincidunt
                                                    iaculis.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rating_wrap">
                                        <h5 className="rating-title-1 mb-2">Add a review </h5>
                                        <p className="mb-2">Your email address will not be published. Required fields
                                            are marked *</p>
                                        <h6 className="rating-title-2 mb-2">Your Rating</h6>
                                        <div className="rating_list mb-4">
                                            <div className="review_info">
                                                <div className="product-rating mb-3">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-o"></i>
                                                    <i className="fa fa-star-o"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comments-area comments-reply-area">
                                        <div className="row">
                                            <div className="col-lg-12 col-custom">
                                                <form action="#" className="comment-form-area">
                                                    <div className="row comment-input">
                                                        <div className="col-md-6 col-custom comment-form-author mb-3">
                                                            <label>Name <span className="required">*</span></label>
                                                            <input type="text" required name="Name"/>
                                                        </div>
                                                        <div className="col-md-6 col-custom comment-form-emai mb-3">
                                                            <label>Email <span className="required">*</span></label>
                                                            <input type="text" required name="email"/>
                                                        </div>
                                                    </div>
                                                    <div className="comment-form-comment mb-3">
                                                        <label>Comment</label>
                                                        <textarea className="comment-notes"
                                                                  required></textarea>
                                                    </div>
                                                    <div className="comment-form-submit">
                                                        <input type="submit" value="Submit"
                                                               className="comment-submit btn obrien-button primary-btn"/>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="connect-3" role="tabpanel" aria-labelledby="contact-tab">
                                <div className="shipping-policy">
                                    <h4 className="title-3 mb-4">Shipping policy for our store</h4>
                                    <p className="desc-content mb-2">Lorem ipsum dolor sit amet, consectetuer adipiscing
                                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                                        erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                                        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
                                        autem vel eum iriure dolor in hendrerit in vulputate</p>
                                    <ul className="policy-list mb-2">
                                        <li>1-2 business days (Typically by end of day)</li>
                                        <li><a href="#">30 days money back guaranty</a></li>
                                        <li>24/7 live support</li>
                                        <li>odio dignissim qui blandit praesent</li>
                                        <li>luptatum zzril delenit augue duis dolore</li>
                                        <li>te feugait nulla facilisi.</li>
                                    </ul>
                                    <p className="desc-content mb-2">Nam liber tempor cum soluta nobis eleifend option
                                        congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi
                                        non habent claritatem insitam; est usus legentis in iis qui facit eorum</p>
                                    <p className="desc-content mb-2">claritatem. Investigationes demonstraverunt
                                        lectores legere me lius quod ii legunt saepius. Claritas est etiam processus
                                        dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam
                                        littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas
                                        humanitatis per</p>
                                    <p className="desc-content mb-2">seacula quarta decima et quinta decima. Eodem modo
                                        typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.</p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="connect-4" role="tabpanel" aria-labelledby="review-tab">
                                <div className="size-tab table-responsive-lg">
                                    <h4 className="title-3 mb-4">Size Chart</h4>
                                    <table className="table border">
                                        <tbody>
                                        <tr>
                                            <td className="cun-name"><span>UK</span></td>
                                            <td>18</td>
                                            <td>20</td>
                                            <td>22</td>
                                            <td>24</td>
                                            <td>26</td>
                                        </tr>
                                        <tr>
                                            <td className="cun-name"><span>European</span></td>
                                            <td>46</td>
                                            <td>48</td>
                                            <td>50</td>
                                            <td>52</td>
                                            <td>54</td>
                                        </tr>
                                        <tr>
                                            <td className="cun-name"><span>usa</span></td>
                                            <td>14</td>
                                            <td>16</td>
                                            <td>18</td>
                                            <td>20</td>
                                            <td>22</td>
                                        </tr>
                                        <tr>
                                            <td className="cun-name"><span>Australia</span></td>
                                            <td>28</td>
                                            <td>10</td>
                                            <td>12</td>
                                            <td>14</td>
                                            <td>16</td>
                                        </tr>
                                        <tr>
                                            <td className="cun-name"><span>Canada</span></td>
                                            <td>24</td>
                                            <td>18</td>
                                            <td>14</td>
                                            <td>42</td>
                                            <td>36</td>
                                        </tr>
                                        </tbody>
                                    </table>
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