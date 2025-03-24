import { useState } from "react";
import EditCountry from "./EditCountry";

interface ICountry {
    id: string;
    country: string;
}

interface CountryProps {
    countries: ICountry[];
    onUpdateCountry: (country: ICountry) => void;
    onDeleteCountry: (uuid: string) => void;
    loading: boolean;
}

const Country = ({
                     countries,
                     onUpdateCountry,
                     onDeleteCountry,
                     loading
                 }: CountryProps) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);

    return (
        <div className="container mt-4">
            {loading ? (
                <div>Loading countries...</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light text-center">
                        <tr>
                            <th style={{ width: "20rem" }}>Country</th>
                            <th style={{ width: "10rem" }}>Edit</th>
                            <th style={{ width: "10rem" }}>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {countries.map((item) => (
                            <tr key={item.id} className="text-center align-middle">
                                <td>{item.country}</td>
                                <td>
                                    <img
                                        style={{ width: "2.2rem", cursor: "pointer" }}
                                        src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                                        onClick={() => {
                                            setSelectedCountry(item);
                                            setEditModalOpen(true);
                                        }}
                                        alt="Edit"
                                    />
                                </td>
                                <td>
                                    <img
                                        style={{ width: "2.2rem", cursor: "pointer" }}
                                        src="https://cdn-icons-png.flaticon.com/128/4315/4315482.png"
                                        onClick={() => onDeleteCountry(item.id)}
                                        alt="Delete"
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editModalOpen && selectedCountry && (
                <EditCountry
                    country={selectedCountry}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={onUpdateCountry}
                />
            )}
        </div>
    );
};

export default Country;