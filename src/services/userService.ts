const UserService = {
    async getUser() {
        const response = await fetch('/api/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return response.json();
    },

    async updateUser(data: { username?: string; password?: string }) {
        const response = await fetch('/api/user/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to update user');
        return response.json();
    },

};

export default UserService;
