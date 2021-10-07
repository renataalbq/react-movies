import axios from 'axios';

export const key = 'cbd351c2a8d0703e52c7d09d292a3acc'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;