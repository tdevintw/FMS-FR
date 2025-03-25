import {useState} from "react";
import EditBuilding from "./EditBuilding.tsx";

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

interface BuildingProps {
    buildings: IBuilding[];
    onUpdateBuilding: (updatedBuilding: {
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
    }) => void;
    onDeleteBuilding: (id: string) => void;
    loading: boolean;
}

const Building = ({
                      buildings,
                      onUpdateBuilding,
                      onDeleteBuilding,
                      loading
                  }: BuildingProps) => {
    const [selectedBuilding, setSelectedBuilding] = useState<IBuilding | null>(null);

    return (
        <div className="container mt-5 mb-5">
            {loading ? (
                <div>Loading buildings...</div>
            ) : (
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
                                        style={{width: "2.2rem", cursor: "pointer"}}
                                        src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                        onClick={() => setSelectedBuilding(building)}
                                    />
                                </td>
                                <td>
                                    <img
                                        style={{width: "2.2rem", cursor: "pointer"}}
                                        src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                        onClick={() => onDeleteBuilding(building.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedBuilding && (
                <EditBuilding
                    building={selectedBuilding}
                    onClose={() => setSelectedBuilding(null)}
                    onUpdate={onUpdateBuilding}
                />
            )}
        </div>
    );
};

export default Building;