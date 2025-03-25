import { useEffect, useState } from "react";
import orderService from "../../services/orderService.ts";

interface ICity {
    id: string;
    city: string;
    country: { id: string; country: string };
}

interface InventoryItem {
    id: string;
    price: number;
    supplier: { id: string, username: string, email: string, role: string };
    food: {
        id: string, food: string, imageUrl: string,
        category: { id: string, category: string, imageUrl: string }
    };
    city: ICity;
}

interface IUser {
    id: string,
    username: string,
    email: string,
    role: string,
}

interface IBuilding {
    id: string,
    name: string,
    city: ICity,
    buildingType: string,
    address: string,
    manager: IUser,
}

interface IOrder {
    id: string;
    quantity: number,
    totalPrice: number,
    supplierInventory: InventoryItem,
    building: IBuilding,
    orderStatus: string,
    currentLocation: string
}

const ManagerOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
    const [locationInput, setLocationInput] = useState("");
    const OrderService = orderService;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderList: IOrder[] = await OrderService.findOrdersByShipperId();
                console.log(orderList);
                setOrders(orderList);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const handleUpdateLocation = (order: IOrder) => {
        setCurrentOrder(order);
        setLocationInput(order.currentLocation || "");
        setShowModal(true);
    };

    const handleSaveLocation = async () => {
        if (!currentOrder) return;

        try {
            await OrderService.updateCurrentLocation(currentOrder.id, locationInput);

            setOrders(orders.map(order =>
                order.id === currentOrder.id
                    ? { ...order, currentLocation: locationInput }
                    : order
            ));

            setShowModal(false);
        } catch (error) {
            console.error("Error updating location:", error);
        }
    };

    const handleMarkAsDelivered = async (orderId: string) => {
        try {
            await OrderService.setStatusToDelivered(orderId);

            setOrders(orders.map(order =>
                order.id === orderId
                    ? { ...order, currentLocation: "Delivered", orderStatus: "DELIVERED" }
                    : order
            ));
        } catch (error) {
            console.error("Error marking as delivered:", error);
        }
    };


    const buttonStyle: React.CSSProperties = {
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    };

    const addButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "#13aa52",
        color: "white",
    };


    const deliveredButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "gray",
        color: "white",
    };

    const cancelButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "#d9534f",
        color: "white",
    };


    return (
        <div className="container mt-5 mb-5">
            {showModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Current Location</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="locationInput" className="form-label">Current Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="locationInput"
                                        value={locationInput}
                                        onChange={(e) => setLocationInput(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    style={cancelButtonStyle}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                   style={addButtonStyle}
                                    onClick={handleSaveLocation}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr className="text-center">
                        <th>Food</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Supplier</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Building</th>
                        <th>Current Location</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center">
                            <td className="align-middle"> {order.supplierInventory.food.food}</td>
                            <td className="align-middle">
                                <img
                                    style={{ width: "7rem", borderRadius: "8px" }}
                                    src={order.supplierInventory.food.imageUrl}
                                    alt={order.supplierInventory.food.food}
                                    className="img-fluid"
                                />
                            </td>
                            <td className="align-middle">{order.quantity}</td>
                            <td className="align-middle">{order.totalPrice}</td>
                            <td className="align-middle"> {order.supplierInventory.supplier.username}</td>
                            <td className="align-middle">{order.building.city.country.country}</td>
                            <td className="align-middle">{order.building.city.city}</td>
                            <td className="align-middle"> {order.building.address}</td>
                            <td className="align-middle">{order.orderStatus}</td>
                            <td className="align-middle">{order.building.name}</td>
                            <td className="align-middle">{ order.currentLocation ?  order.currentLocation  : order.orderStatus!="PENDING" ?  order.orderStatus: "Not Shipped Yet"}</td>
                            <td className="align-middle">
                                {order.orderStatus != "DELIVERED" && order.orderStatus != "REFUSED" && (
                                    <div className="d-flex gap-2 justify-content-center">
                                        <button
                                            style={addButtonStyle}
                                            onClick={() => handleUpdateLocation(order)}
                                        >
                                            Update Location
                                        </button>
                                        <button
                                            style={deliveredButtonStyle}
                                            onClick={() => handleMarkAsDelivered(order.id)}
                                        >
                                            Delivered
                                        </button>
                                    </div>
                                )}


                                {order.orderStatus === "DELIVERED" && (
                                    <div className="d-flex gap-2 justify-content-center">
                                        Order DELIVERED
                                    </div>
                                )}
                                {order.orderStatus === "REFUSED" && (
                                    <div className="d-flex gap-2 justify-content-center">
                                        Order REFUSED
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerOrders;