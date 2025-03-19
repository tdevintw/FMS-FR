import { useEffect, useState } from "react";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import { DashboardHeader } from "../../components/admin/DashboardHeader.tsx";
import AddCountry from "../../components/admin/country/AddCountry.tsx";
import CountryService from "../../services/countryService.ts";
import Country from "../../components/admin/country/Country"
interface ICountry {
    id: string;
    country: string;
}

const CountryPage = () => {
    const { getAll } = CountryService;
    const [countries, setCountries] = useState<ICountry[]>([]);

    const fetchCountries = async () => {
        try {
            const response = await getAll();
            setCountries(response);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <div className="home-wrapper home-2">
            <Header />
            <main>
                <DashboardHeader page={"Country"} />
                <AddCountry fetchCountries={fetchCountries} />
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <Country countries={countries} setCountries={setCountries} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CountryPage;
