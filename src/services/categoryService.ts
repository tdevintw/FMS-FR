    import axios from "axios";


    const CategoryService = {
        async add(categoryName: string, file: File) {

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
            const categoryBlob = new Blob([JSON.stringify({ category: categoryName })], { type: "application/json" });
            formData.append("category", categoryBlob);
            formData.append("image", file);

            try {
                const response = await axios.post("http://localhost:9999/api/categories", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${user.token}`
                    },
                });

                return response.data;
            } catch (error) {
                console.error("Error adding category:", error);
                throw error;
            }
        },
        async edit(categoryName: string, file: File | null, uuid: string) {

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
            const categoryBlob = new Blob([JSON.stringify({ category: categoryName })], { type: "application/json" });
            formData.append("category", categoryBlob);
            if(file){
                formData.append("image", file);
            }


            try {
                const response = await axios.put("http://localhost:9999/api/categories/"+uuid, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${user.token}`
                    },
                });

                return response.data;
            } catch (error) {
                console.error("Error adding category:", error);
                throw error;
            }
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



            try {
                const response = await axios.get("http://localhost:9999/api/categories", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                });

                return response.data;
            } catch (error) {
                console.error("Error adding category:", error);
                throw error;
            }
        },

        async remove(uuid : string){
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
                const response = await axios.delete("http://localhost:9999/api/categories/"+uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                });

                return response.data;
            } catch (error) {
                console.error("Error adding category:", error);
                throw error;
            }
        },



    };

    export default CategoryService;
