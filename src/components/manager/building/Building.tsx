import {useEffect, useState} from "react";
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
    buildingType : string ,
    manager : IUser,
}

const Building = () => {


    const [buildings, setBuildings] = useState<IBuilding[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState<IBuilding | null>(null);
    const BuildingService = buildingService;

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const buildingList: IBuilding[] = await BuildingService.getAll();
                setBuildings(buildingList);
            } catch (error) {
                console.error("Error fetching buildings:", error);
            }
        };

        fetchCities();
    }, []);



    const handleRemove = async (id: string) => {
        try {
            await BuildingService.remove(id);
            setBuildings((prevInventories) => prevInventories.filter((inventory) => inventory.id !== id));
        } catch (error) {
            console.error("Error removing inventory:", error);
        }
    };

    return (
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th style={{textAlign: "center", width: "20rem", border: "1px solid gray"}}
                        className="p-3">Name
                    </th>
                    <th style={{textAlign: "center", width: "20rem", border: "1px solid gray"}} className="p-3">Type
                    </th>
                    <th style={{textAlign: "center", width: "20rem", border: "1px solid gray"}} className="p-3">City
                    </th>
                    <th style={{textAlign: "center", border: "1px solid gray"}} className="p-3">Edit</th>
                    <th style={{textAlign: "center", border: "1px solid gray"}} className="p-3">Remove</th>
                </tr>
                </thead>
                <tbody>
                {buildings.map((building) => (
                    <tr className="border-t">
                        <td className="p-3" style={{border: "1px solid gray"}}>
                            {building.name}
                        </td>
                        <td className="p-3" style={{border: "1px solid gray"}}>
                            {building.buildingType}
                        </td>
                        <td className="p-3" style={{border: "1px solid gray"}}>
                            {building.city.city}
                        </td>
                        <td className="p-3 cursor-pointer text-center"
                            style={{border: "1px solid gray", width: "10rem"}}>
                            <img
                                style={{width: "2.2rem", cursor: "pointer"}}
                                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                onClick={() => {
                                    setSelectedBuilding(building);
                                    setEditModalOpen(true);
                                }}
                            />
                        </td>
                        <td className="p-3 cursor-pointer text-center"
                            style={{border: "1px solid gray", width: "10rem"}}>
                            <img style={{width: "2.2rem"}} onClick={()=>handleRemove(building.id)}
                                 src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

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
