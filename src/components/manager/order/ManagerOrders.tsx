import orderService from "../../../services/orderService.ts";
import {useEffect, useState} from "react";


interface ICity {
    id: string;
    city: string;
    country: { id: string; country: string };
}

interface InventoryItem {
    id: string;
    price: number;
    user: { id: string, username: string, email: string, role: string };
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
    buildingType : string ,
    address : string
    manager : IUser,
}


interface IOrder{
    quantity : number ,
    totalPrice : number ,
    supplierInventory : InventoryItem,
    building : IBuilding,
    status : string ,
    shipment : {id : string , currentLocation:string}
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
        <div>
            <table className="w-full border border-gray-200 text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-3 w-25" style={{ textAlign: "center", border: "1px solid gray" }}>Food</th>
                    <th className="p-3" style={{ textAlign: "center", width: "20rem", border: "1px solid gray" }}>Image</th>
                    <th className="p-3 w-25" style={{ textAlign: "center", border: "1px solid gray" }}>Quantity</th>
                    <th className="p-3 w-25" style={{ textAlign: "center", border: "1px solid gray" }}>Total Price</th>
                    <th className="p-3 w-25" style={{ textAlign: "center", border: "1px solid gray" }}>Supplier</th>
                    <th className="p-3 w-25" style={{ textAlign: "center", border: "1px solid gray" }}>Status</th>
                    <th className="p-3 w-25" style={{ textAlign: "center", border: "1px solid gray" }}>Building</th>
                    <th className="p-3 w-25" style={{ textAlign: "center", border: "1px solid gray" }}>Current Location</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr className="border-t">
                        <td className="p-3" style={{ border: "1px solid gray" }}>{order.supplierInventory.food.food}</td>
                        <td className="p-3 text-center" style={{ border: "1px solid gray" }}>
                            <img style={{ width: "7rem" }} src={order.supplierInventory.food.imageUrl} alt={order.supplierInventory.food.food} />
                        </td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>{order.quantity}</td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>{order.totalPrice}</td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>{order.supplierInventory.user.username}</td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>{order.status}</td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>{order.building.name}</td>
                        <td className="p-3" style={{ border: "1px solid gray" }}>{order.shipment ? order.shipment.currentLocation: "Not Shipped Yet"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagerOrders;
