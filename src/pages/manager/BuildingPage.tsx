import {useState, useEffect} from 'react';
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import {DashboardHeader} from "../../components/admin/DashboardHeader.tsx";
import AddBuilding from "../../components/manager/building/AddBuilding.tsx";
import Building from "../../components/manager/building/Building.tsx";
import buildingService from "../../services/buildingService.ts";

interface IBuilding {
    id: string;
    name: string;
    city: {
        id: string;
        city: string;
        country: {
            id: string;
            country: string
        };
    };
    buildingType: string;
    address: string;
    manager: {
        id: string;
        username: string;
        email: string;
        role: string;
    };
}

const BuildingPage = () => {
    const [buildings, setBuildings] = useState<IBuilding[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBuildings = async () => {
        try {
            setLoading(true);
            const buildingList = await buildingService.getAll();
            setBuildings(buildingList);
        } catch (error) {
            console.error("Error fetching buildings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuildings();
    }, []);

    const handleAddBuilding = (newBuilding: IBuilding) => {
        setBuildings(prev => [...prev, newBuilding]);
    };

    const handleUpdateBuilding = (updatedBuilding: {
        id: string;
        name: string;
        buildingType: string;
        cityId: string;
        address: string;
        city?: {
            id: string;
            city: string;
            country: {
                id: string;
                country: string
            };
        };
        country?: {
            id: string;
            country: string
        };
    }) => {
        setBuildings(prev =>
            prev.map(building =>
                building.id === updatedBuilding.id
                    ? {
                        ...building,
                        name: updatedBuilding.name,
                        buildingType: updatedBuilding.buildingType,
                        address: updatedBuilding.address,
                        city: updatedBuilding.city || {
                            ...building.city,
                            id: updatedBuilding.cityId
                        },
                        ...(updatedBuilding.country && {
                            city: {
                                ...building.city,
                                country: updatedBuilding.country
                            }
                        })
                    }
                    : building
            )
        );
    };

    const handleDeleteBuilding = async (id: string) => {
        try {
            setBuildings(prev => prev.filter(building => building.id !== id));
            await buildingService.remove(id);
            const freshList = await buildingService.getAll();
            setBuildings(freshList);
        } catch (error) {
            console.error("Error deleting building:", error);
            fetchBuildings();
        }
    };

    return (
        <div className="home-wrapper home-2">
            <Header/>
            <main>
                <DashboardHeader page={"Building"}/>
                <AddBuilding onAddBuilding={handleAddBuilding}/>
                <div className="my-account-wrapper mt-no-text mb-no-text">
                    <div
                        className="container container-default-2 custom-area d-flex justify-content-center text-center">
                        <Building
                            buildings={buildings}
                            onUpdateBuilding={handleUpdateBuilding}
                            onDeleteBuilding={handleDeleteBuilding}
                            loading={loading}
                        />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default BuildingPage;