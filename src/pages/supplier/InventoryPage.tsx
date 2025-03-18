import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import AddInventory from "../../components/supplier/inventory/AddInventory.tsx";
import Inventory from "../../components/supplier/inventory/Inventory.tsx";


const InventoryPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Inventory"}/>
                <AddInventory/>
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div  className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <Inventory  />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default InventoryPage;