
const CityService = {


    async add(data: { city: string , countryId : string}) {

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


        const response = await fetch("http://localhost:9999/api/cities", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        return response.json();

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


        const response = await fetch("http://localhost:9999/api/cities" + "/" + uuid, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });

        return response.json();
    },

    async edit(data: {id : string , city: string , countryId : string }) {

        console.log("Editing data:", data);
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


        const response = await fetch("http://localhost:9999/api/cities" + "/" + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body : JSON.stringify(data),
        });

        return response.json();
    },

    async getAll(){
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


        const response = await fetch("http://localhost:9999/api/cities", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });

        return response.json();
    },

    async get(id : string){
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


        const response = await fetch("http://localhost:9999/api/cities"+"/"+id , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });

        return response.json();
    }
}



export default CityService;