import axios from 'axios';

const services = () => {
    const bodyUrl = 'http://localhost:5000/api/';
    const { get } = axios;

    return {
        getData: async (name, id = '') => {
            const { data } = await get(`${bodyUrl}${name}/${id.toString()}`);
            return data;
        }
    };
};

export default services;