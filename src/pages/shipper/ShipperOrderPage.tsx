import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";

import Order from "../../components/shipper/Order";


const ShipperOrderPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Manage Orders"}/>
                <div>
                    <Order />
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default ShipperOrderPage;