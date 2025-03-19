import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import Country from "../../components/admin/country/Country.tsx";
import AddCountry from "../../components/admin/country/AddCountry.tsx";

const CountryPage = () => {
    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Country"}/>
                <AddCountry />
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div  className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <Country />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default CountryPage;