import axios from "axios";

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
    }
}

export default OrderService;