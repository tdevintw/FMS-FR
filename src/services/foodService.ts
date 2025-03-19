import axios from "axios";

const FoodService = {
    async add(foodName: string, categoryId: string, file: File) {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            throw new Error('User not authenticated');
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error(error);
            throw new Error('Invalid stored user data');
        }
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }

        const formData = new FormData();
        const foodBlob = new Blob([JSON.stringify({ name: foodName, categoryId })], { type: "application/json" });
        formData.append("food", foodBlob);
        formData.append("image", file);

        try {
            const response = await axios.post("http://localhost:9999/api/foods", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${user.token}`
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error adding food:", error);
            throw error;
        }
    },

    async edit(foodName: string, categoryId: string, file: File | null, uuid: string) {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            throw new Error('User not authenticated');
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error(error);
            throw new Error('Invalid stored user data');
        }
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }

        const formData = new FormData();
        const foodBlob = new Blob([JSON.stringify({ name: foodName, categoryId })], { type: "application/json" });
        formData.append("food", foodBlob);
        if (file) {
            formData.append("image", file);
        }

        try {
            const response = await axios.put(`http://localhost:9999/api/foods/${uuid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${user.token}`
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error editing food:", error);
            throw error;
        }
    },

    async getAll() {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            throw new Error('User not authenticated');
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error(error);
            throw new Error('Invalid stored user data');
        }
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }

        try {
            const response = await axios.get("http://localhost:9999/api/foods", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching foods:", error);
            throw error;
        }
    },

    async remove(uuid: string) {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            throw new Error('User not authenticated');
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error(error);
            throw new Error('Invalid stored user data');
        }
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }

        try {
            const response = await axios.delete(`http://localhost:9999/api/foods/${uuid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error deleting food:", error);
            throw error;
        }
    }
};

export default FoodService;
