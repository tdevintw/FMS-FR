
const getUserIdFromToken = (token: string): string | null => {
    try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload.id || null;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}


const BuildingService = {
    async add( name: string, buildingType: string, cityId: string , address : string ) {
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
         const data = {name : name , buildingType : buildingType , cityId : cityId , managerId : managerId , address : address};

        const response = await fetch("http://localhost:9999/api/buildings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to add building");
        }

        return response.json();
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

        const response = await fetch(`http://localhost:9999/api/buildings/${uuid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });

        return response.json();
    },

    async edit(data: { id: string; name: string; buildingType: string; cityId: string , address : string }) {
        console.log("Editing data:", data);
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

        const response = await fetch(`http://localhost:9999/api/buildings/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(data),
        });

        return response.json();
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

        const managerId = getUserIdFromToken(user.token);
        if (!managerId) {
            throw new Error("Invalid or missing user ID in token");
        }


        const response = await fetch("http://localhost:9999/api/buildings/manager/"+managerId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });
            return response.json();
    },

    async get(id: string) {
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

        const response = await fetch(`http://localhost:9999/api/buildings/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });

        return response.json();
    },

}

export default BuildingService;
