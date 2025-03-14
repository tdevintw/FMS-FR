import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";

const NotFoundPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <div className="error-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="error_form">
                                    <h1>404</h1>
                                    <h2>Oops! PAGE NOT FOUND</h2>
                                    <p>
                                        Sorry, but the page you are looking for does not exist, has been
                                        removed, name changed, or is temporarily unavailable.
                                    </p>
                                    <form>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                        />
                                        <button type="submit">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </form>
                                    <a href="index.html">Back to home page</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFoundPage;