import { useState, useEffect } from 'react';
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import City from "../../components/admin/city/City.tsx";
import AddCity from "../../components/admin/city/AddCity.tsx";
import cityService from "../../services/cityService.ts";

interface ICity {
    id: string;
    city: string;
    country?: { id: string; country: string };
}

const CityPage = () => {
    const { getAll } = cityService;
    const [cities, setCities] = useState<ICity[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCities = async () => {
        try {
            setLoading(true);
            const cityList = await getAll();
            setCities(cityList);
        } catch (error) {
            console.error("Error fetching cities:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const handleAddCity = (newCity: ICity) => {
        setCities([...cities, newCity]);
    };

    const handleUpdateCity = (updatedCity: ICity) => {
        setCities(cities.map(item =>
            item.id === updatedCity.id ? updatedCity : item
        ));
    };

    const handleDeleteCity = async (uuid: string) => {
        try {
            // Optimistically update the UI
            setCities(prevCities => prevCities.filter(city => city.id !== uuid));

            await cityService.remove(uuid);

            // Optional: verify with server
            const freshList = await getAll();
            setCities(freshList);
        } catch (error) {
            console.error("Error deleting city:", error);
            // Revert to server state if something went wrong
            fetchCities();
        }
    };

    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"City"}/>
                <AddCity onAddCity={handleAddCity} />
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <City
                            cities={cities}
                            onUpdateCity={handleUpdateCity}
                            onDeleteCity={handleDeleteCity}
                            loading={loading}
                        />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default CityPage;