import BlogCard from "./BlogCard.tsx";

const BlogSection = () => {
    return (
        <div className="latest-blog-area">
            <div className="container container-default custom-area">
                <div className="row">
                    <div className="col-lg-5 m-auto text-center col-custom">
                        <div className="section-content">
                            <h2 className="title-1 text-uppercase">Latest Blog</h2>
                            <div className="desc-content">
                                <p>If you want to know about the organic product then keep an eye on our blog.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-custom">
                        <div className="obrien-slider">
                            <BlogCard
                                image="../src/assets/images/blog/medium-size/1.jpg"
                                date={{ day: "14", month: "01" }}
                                author="Obrien Demo Admin"
                                title="There Are Many Variation of Passages of Lorem Ipsum Available"
                                excerpt="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making..."
                            />
                            <BlogCard
                                image="../src/assets/images/blog/medium-size/2.jpg"
                                date={{ day: "14", month: "01" }}
                                author="Obrien Demo Admin"
                                title="There Are Many Variation of Passages of Lorem Ipsum Available"
                                excerpt="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making..."
                            />
                            <BlogCard
                                image="../src/assets/images/blog/medium-size/3.jpg"
                                date={{ day: "14", month: "01" }}
                                author="Obrien Demo Admin"
                                title="The Standard Chunk Of Lorem Ipsum Used Since"
                                excerpt="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making..."
                            />
                            {/* More blog cards here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default BlogSection;