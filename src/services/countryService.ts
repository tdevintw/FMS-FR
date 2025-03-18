const CountryService = {

    api: "http://localhost:9999/api/countries",

    async add(data: { country: string }) {

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


        const response = await fetch(this.api, {
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

    async delete(uuid: string) {


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


        const response = await fetch(this.api + "/" + uuid, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });

        return response.json();
    },


    async edit(data: {country: string } , uuid : string) {
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


        const response = await fetch(this.api + "/" + uuid, {
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


        const response = await fetch(this.api , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });

        return response.json();
    },

    async get(uuid : string){
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


    const response = await fetch(this.api+"/"+uuid , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
    });

    return response.json();
}
}



export default CountryService;