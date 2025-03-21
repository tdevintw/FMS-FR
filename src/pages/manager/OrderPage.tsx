import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";

import Order from "../../components/manager/order/Order.tsx";


const OrderPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Order Food"}/>
                <div>
                    <Order />
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default OrderPage;