import Axios from 'axios';

const axios = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export default axios;
