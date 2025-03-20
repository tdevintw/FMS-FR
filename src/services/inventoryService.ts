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

const InventoryService = {
    async add(foodId: string, price: number) {
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

        const inventoryData = { foodId, price, supplierId };

        try {
            const response = await axios.post("http://localhost:9999/api/supplierInventories", inventoryData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error adding inventory item:", error);
            throw error;
        }
    },

    async edit(foodId: string, price: number, uuid: string) {
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

        const inventoryData = { foodId, price, supplierId };

        try {
            const response = await axios.put(`http://localhost:9999/api/supplierInventories/${uuid}`, inventoryData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error editing inventory item:", error);
            throw error;
        }
    },

    async getAll() {
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
            const response = await axios.get("http://localhost:9999/api/supplierInventories/"+supplierId, {
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

    async remove(uuid: string) {
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

        try {
            const response = await axios.delete(`http://localhost:9999/api/supplierInventories/${uuid}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error deleting inventory item:", error);
            throw error;
        }
    },
};

export default InventoryService;
