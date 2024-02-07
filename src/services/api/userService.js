import { client } from './configs/axiosConfigs';
export const userService = {
    fetchJob: async () => {
        try {
            let response = await client.get('/posts?_limit=5');
            if(!response.status){
                console.log(response);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    addJob: async (title, body) => {
        try {
            let response = await client.post('', {
                title: title,
                body: body,
            });
            if(!response.status){
                console.log(response);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    },
}
