import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import ManagerOrders from "../../components/manager/order/ManagerOrders.tsx";


const ManagerOrdersPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"My Orders"}/>
                <div>
                    <ManagerOrders />
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default ManagerOrdersPage;