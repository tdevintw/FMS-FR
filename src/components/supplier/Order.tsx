import { useEffect, useState } from "react";
import orderService from "../../services/orderService.ts";
import userService from "../../services/userService.ts";

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
    shipment: { id: string, currentLocation: string }
}

interface IShipper {
    id: string;
    username: string;
    email: string;
}

const SupplierOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [shippers, setShippers] = useState<IShipper[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [selectedShipperId, setSelectedShipperId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const OrderService = orderService;
    const UserService = userService;
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderList: IOrder[] = await OrderService.findOrdersBySupplierId();
                console.log(orderList);
                setOrders(orderList);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        const fetchShippers = async () => {
            try {
                const shipperList = await UserService.getAllShippers();
                setShippers(shipperList);
            } catch (error) {
                console.error("Error fetching shippers:", error);
            }
        };

        fetchOrders();
        fetchShippers();
    }, []);

    const handleRefuseOrder = async (orderId: string) => {
        try {
            // await OrderService.updateOrderStatus(orderId, "REFUSED");
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, orderStatus: "REFUSED" } : order
            ));
        } catch (error) {
            console.error("Error refusing order:", error);
        }
    };

    const openAssignShipperModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const handleAssignShipper = async () => {
        if (!selectedOrderId || !selectedShipperId) return;

        try {
            // await OrderService.assignShipperToOrder(selectedOrderId, selectedShipperId);
            setOrders(orders.map(order =>
                order.id === selectedOrderId ? { ...order, orderStatus: "ASSIGNED" } : order
            ));
            setIsModalOpen(false);
            setSelectedOrderId(null);
            setSelectedShipperId(null);
        } catch (error) {
            console.error("Error assigning shipper:", error);
        }
    };

    const filteredShippers = shippers.filter(shipper =>
        shipper.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipper.email.toLowerCase().includes(searchTerm.toLowerCase())
    );



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

    const cancelButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "#d9534f",
        color: "white",
    };



    return (
        <div className="container mt-5 mb-5">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr className="text-center">
                        <th>Food</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Supplier</th>
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
                            <td className="align-middle">{order.orderStatus}</td>
                            <td className="align-middle">{order.building.name}</td>
                            <td className="align-middle">{order.shipment ? order.shipment.currentLocation : "Not Shipped Yet"}</td>
                            <td className="align-middle">
                                {order.orderStatus === "PENDING" && (
                                    <div className="d-flex gap-2 justify-content-center">
                                        <button
                                            style={cancelButtonStyle}
                                            onClick={() => handleRefuseOrder(order.id)}
                                        >
                                            Refuse
                                        </button>
                                        <button
                                            style={addButtonStyle}
                                            onClick={() => openAssignShipperModal(order.id)}
                                        >
                                            Assign Shipper
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div  className=" modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Assign Shipper to Order</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setSelectedShipperId(null);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search shippers by username or email"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Select</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredShippers.map(shipper => (
                                            <tr key={shipper.id}>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name="shipperSelection"
                                                        checked={selectedShipperId === shipper.id}
                                                        onChange={() => setSelectedShipperId(shipper.id)}
                                                    />
                                                </td>
                                                <td>{shipper.username}</td>
                                                <td>{shipper.email}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    style={cancelButtonStyle}
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setSelectedShipperId(null);
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    style={addButtonStyle}
                                    onClick={handleAssignShipper}
                                    disabled={!selectedShipperId}
                                >
                                    Assign Shipper
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierOrders;