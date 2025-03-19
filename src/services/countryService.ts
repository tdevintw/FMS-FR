const CountryService = {


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


        const response = await fetch("http://localhost:9999/api/countries", {
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


        const response = await fetch("http://localhost:9999/api/countries" + "/" + uuid, {
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


        const response = await fetch("http://localhost:9999/api/countries" + "/" + uuid, {
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


        const response = await fetch("http://localhost:9999/api/countries", {
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


    const response = await fetch("http://localhost:9999/api/countries"+"/"+uuid , {
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