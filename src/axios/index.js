import axios from 'axios';
import store from "@/store";

const api = axios.create({
    baseURL: 'https://pycrs.rocks:444/api'
});

api.interceptors.request.use(req => {
    const token = store.getters["Auth/getAccessToken"];
    if (token) req.headers.Authorization = token;
    return req;
});

export const quotes = axios.create({
    baseURL: 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
    headers: {
        "x-rapidapi-key": '534f71a2e0msh462d67c3f7a7428p1c0887jsn5098de42488a'
    }
});

export default api;