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
    quantity: number,
    totalPrice: number,
    supplierInventory: InventoryItem,
    building: IBuilding,
    orderStatus: string,
    currentLocation: string
}

const ManagerOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const OrderService = orderService;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderList: IOrder[] = await OrderService.findOrdersByManagerId();
                console.log(orderList);
                setOrders(orderList);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="table-responsive">
                <table className="table table-bordered ">
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
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr  key={order.supplierInventory.id} className="text-center">
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
                            <td className="align-middle">{ order.currentLocation ?  order.currentLocation : "Not Shipped Yet"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerOrders;
