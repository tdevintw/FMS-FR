import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import AddBuilding from "../../components/manager/building/AddBuilding.tsx";
import Building from "../../components/manager/building/Building.tsx";


const BuildingPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Building"}/>
                <AddBuilding/>
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div  className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <Building  />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default BuildingPage;