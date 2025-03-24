import { useState, useEffect } from 'react';
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import Country from "../../components/admin/country/Country.tsx";
import AddCountry from "../../components/admin/country/AddCountry.tsx";
import countryService from "../../services/countryService.ts";

interface ICountry {
    id: string;
    country: string;
}

const CountryPage = () => {
    const { getAll, remove } = countryService;
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCountries = async () => {
        try {
            setLoading(true);
            const countryList = await getAll();
            setCountries(countryList);
        } catch (error) {
            console.error("Error fetching countries:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const handleAddCountry = (newCountry: ICountry) => {
        setCountries([...countries, newCountry]);
    };

    const handleUpdateCountry = (updatedCountry: ICountry) => {
        setCountries(countries.map(item =>
            item.id === updatedCountry.id ? updatedCountry : item
        ));
    };

    const handleDeleteCountry = async (uuid: string) => {
        try {
            await remove(uuid); // First delete from backend
            setCountries(prevCountries => prevCountries.filter(country => country.id !== uuid));
        } catch (error) {
            console.error("Error deleting country:", error);
            fetchCountries();
        }
    };

    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Country"}/>
                <AddCountry onAddCountry={handleAddCountry} />
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <Country
                            countries={countries}
                            onUpdateCountry={handleUpdateCountry}
                            onDeleteCountry={handleDeleteCountry}
                            loading={loading}
                        />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default CountryPage;