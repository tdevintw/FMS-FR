import { useState } from "react";
import EditCity from "./EditCity";

interface ICity {
    id: string;
    city: string;
    country?: { id: string; country: string };
}

interface CityProps {
    cities: ICity[];
    onUpdateCity: (city: ICity) => void;
    onDeleteCity: (uuid: string) => void;
    loading: boolean;
}

const City = ({
                  cities,
                  onUpdateCity,
                  onDeleteCity,
                  loading
              }: CityProps) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

    return (
        <div className="container mt-4">
            {loading ? (
                <div>Loading cities...</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light text-center">
                        <tr>
                            <th style={{ width: "20rem" }}>City</th>
                            <th style={{ width: "20rem" }}>Country</th>
                            <th style={{ width: "10rem" }}>Edit</th>
                            <th style={{ width: "10rem" }}>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cities.map((item) => (
                            <tr key={item.id} className="text-center align-middle">
                                <td>{item.city}</td>
                                <td>{item.country?.country || "N/A"}</td>
                                <td>
                                    <img
                                        style={{ width: "2.2rem", cursor: "pointer" }}
                                        src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                        onClick={() => {
                                            setSelectedCity(item);
                                            setEditModalOpen(true);
                                        }}
                                        alt="Edit"
                                    />
                                </td>
                                <td>
                                    <img
                                        style={{ width: "2.2rem", cursor: "pointer" }}
                                        src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                        onClick={() => onDeleteCity(item.id)}
                                        alt="Delete"
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editModalOpen && selectedCity && (
                <EditCity
                    city={selectedCity}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={onUpdateCity}
                />
            )}
        </div>
    );
};

export default City;