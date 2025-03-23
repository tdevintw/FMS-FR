import { useEffect, useState } from "react";
import buildingService from "../../../services/buildingService.ts";
import EditBuilding from "./EditBuilding.tsx";

interface IUser {
    id: string,
    username: string,
    email: string,
    role: string,
}

interface ICity {
    id: string;
    city: string;
    country: { id: string; country: string };
}

interface IBuilding {
    id: string,
    name: string,
    city: ICity,
    buildingType: string,
    address: string,
    manager: IUser,
}

const Building = () => {
    const [buildings, setBuildings] = useState<IBuilding[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState<IBuilding | null>(null);
    const BuildingService = buildingService;

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const buildingList: IBuilding[] = await BuildingService.getAll();
                setBuildings(buildingList);
            } catch (error) {
                console.error("Error fetching buildings:", error);
            }
        };

        fetchBuildings();
    }, []);

    const handleRemove = async (id: string) => {
        try {
            await BuildingService.remove(id);
            setBuildings((prevBuildings) => prevBuildings.filter((building) => building.id !== id));
        } catch (error) {
            console.error("Error removing building:", error);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Type</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {buildings.map((building) => (
                        <tr key={building.id} className="text-center align-middle">
                            <td>{building.name}</td>
                            <td>{building.buildingType}</td>
                            <td>{building.city.city}</td>
                            <td>{building.address}</td>
                            <td>
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                    onClick={() => {
                                        setSelectedBuilding(building);
                                        setEditModalOpen(true);
                                    }}
                                />
                            </td>
                            <td>
                                <img
                                    style={{ width: "2.2rem", cursor: "pointer" }}
                                    src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                    onClick={() => handleRemove(building.id)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {editModalOpen && selectedBuilding && (
                <EditBuilding
                    building={selectedBuilding}
                    onClose={() => setEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Building;
