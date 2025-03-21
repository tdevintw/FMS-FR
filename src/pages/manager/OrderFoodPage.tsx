import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import OrderFood from "../../components/manager/order/OrderFood.tsx";


const OrderFoodPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Order Food"}/>
                <div>
                    <OrderFood />
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default OrderFoodPage;