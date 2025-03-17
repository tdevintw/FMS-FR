const UserService = {
    async getUser() {
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

        const tokenParts = user.token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid token format');
        }

        let tokenPayload;
        try {
            tokenPayload = JSON.parse(atob(tokenParts[1]));
        } catch (error) {
            console.error(error);
            throw new Error('Failed to decode token');
        }

        const {role, id} = tokenPayload;
        if (!role || !id) {
            throw new Error('Invalid token structure');
        }

        const rolePath = role.toLowerCase() + 's';
        const apiUrl = `http://localhost:9999/api/${rolePath}/${id}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        return response.json();
    },

    async updateUser(data: { password?: string }) {
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

        const tokenParts = user.token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid token format');
        }

        let tokenPayload;
        try {
            tokenPayload = JSON.parse(atob(tokenParts[1]));
        } catch (error) {
            console.error(error);
            throw new Error('Failed to decode token');
        }

        const {role, id} = tokenPayload;
        if (!role || !id) {
            throw new Error('Invalid token structure');
        }

        const rolePath = role.toLowerCase() + 's';
        const apiUrl = `http://localhost:9999/api/${rolePath}/${id}`;

        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        });
        console.log(JSON.stringify(data));
        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        return response.json();
    },

    async deleteUser() {
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

        const tokenParts = user.token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid token format');
        }

        let tokenPayload;
        try {
            tokenPayload = JSON.parse(atob(tokenParts[1]));
        } catch (error) {
            console.error(error);
            throw new Error('Failed to decode token');
        }

        const {role, id} = tokenPayload;
        if (!role || !id) {
            throw new Error('Invalid token structure');
        }

        const rolePath = role.toLowerCase() + 's';
        const apiUrl = `http://localhost:9999/api/${rolePath}/${id}`;

        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        // Remove user from localStorage
        localStorage.removeItem('user');
    }
};

export default UserService;
