import axios from 'axios';

const services = () => {
    const bodyUrl = 'http://localhost:5000/api/';
    const { get, put } = axios;

    return {
        getData: async (name, id = '') => {
            return await get(`${bodyUrl}${name}/${id.toString()}`)
                .then(response => {
                    console.log(response);
                    return response.data;
                })
                .catch(err => {
                    throw err;
                });
        },

        putData: async (name, data) => {
            return await put(`${bodyUrl}${name}/${data.id.toString()}`, data)
                .then(response => response.data)
                .catch(err => {
                    throw err;
                });
        },
    };
};

export default services;
