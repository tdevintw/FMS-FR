import axios from "axios";


const getUserIdFromToken = (token: string): string | null => {
    try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload.id || null;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};


const OrderService = {

    async add(quantity : number , supplierInventoryId : string , buildingId : string ,totalPrice : number ){
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            throw new Error("User not authenticated");
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error(error);
            throw new Error("Invalid stored user data");
        }
        if (!user || !user.token) {
            throw new Error("User not authenticated");
        }


        const orderData = { quantity, supplierInventoryId, buildingId ,totalPrice };

        try {
            const response = await axios.post("http://localhost:9999/api/orders", orderData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error adding خقيثق item:", error);
            throw error;
        }
    },

    async findOrdersByManagerId(){
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            throw new Error("User not authenticated");
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error(error);
            throw new Error("Invalid stored user data");
        }
        if (!user || !user.token) {
            throw new Error("User not authenticated");
        }
        const managerId = getUserIdFromToken(user.token);
        if (!managerId) {
            throw new Error("Invalid or missing user ID in token");
        }

        try {
            const response = await axios.get("http://localhost:9999/api/orders/manager/"+managerId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching inventory items:", error);
            throw error;
        }
    },

    async findOrdersBySupplierId(){
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            throw new Error("User not authenticated");
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error(error);
            throw new Error("Invalid stored user data");
        }
        if (!user || !user.token) {
            throw new Error("User not authenticated");
        }
        const supplierId = getUserIdFromToken(user.token);
        if (!supplierId) {
            throw new Error("Invalid or missing user ID in token");
        }

        try {
            const response = await axios.get("http://localhost:9999/api/orders/supplier/"+supplierId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching inventory items:", error);
            throw error;
        }
    },

    async edit(id : string , quantity : number , supplierInventoryId : string , buildingId : string ,totalPrice : number ,orderStatus : string){
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            throw new Error("User not authenticated");
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error(error);
            throw new Error("Invalid stored user data");
        }
        if (!user || !user.token) {
            throw new Error("User not authenticated");
        }


        const orderData = { quantity, supplierInventoryId, buildingId ,totalPrice , orderStatus};

        console.log(id);

        try {
            const response = await axios.put("http://localhost:9999/api/orders/"+id, orderData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error adding  item:", error);
            throw error;
        }
    },

    async assignShipper(orderId : string ,shipperId : string){
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            throw new Error("User not authenticated");
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error(error);
            throw new Error("Invalid stored user data");
        }
        if (!user || !user.token) {
            throw new Error("User not authenticated");
        }

        const shipperData = { orderId, shipperId};
        console.log(shipperData);
        try {
            const response = await axios.put("http://localhost:9999/api/orders/assign-shipper", shipperData ,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error adding  item:", error);
            throw error;
        }
    }



}

export default OrderService;