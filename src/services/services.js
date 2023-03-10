import axios from 'axios';

const services = () => {
    const bodyUrl = 'http://localhost:5000/api/';
    const { get, put, delete: del, post } = axios;

    return {
        getData: async (name, id = '') => {
            return await get(`${bodyUrl}${name}/${id.toString()}`)
                .then(response => {
                    return response.data;
                })
                .catch(err => {
                    throw err;
                });
        },

        postData: async (name, data) => {
            return await post(`${bodyUrl}${name}`, data)
                .then(response => response.data)
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

        deleteData: async (name, id) => await del(`${bodyUrl}${name}/${id.toString()}`),
    };
};

export default services;
