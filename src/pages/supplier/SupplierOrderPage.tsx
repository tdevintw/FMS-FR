import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import Order from "../../components/supplier/Order.tsx";


const SupplierOrderPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"My Orders"}/>
                <div>
                    <Order />
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default SupplierOrderPage;