import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import Food from "../../components/admin/food/Food.tsx";

const FoodPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Food"}/>
                <div className="cart-main-wrapper mt-no-text mb-no-text">
                    <div className="container container-default-2 custom-area">
                        <div className="row mx-5">
                            <div className="col-lg-12">
                                <div className="cart-table table-responsive">
                                    <div
                                        className="container container-default-2 custom-area d-flex justify-content-center text-center">
                                        <Food/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default FoodPage;