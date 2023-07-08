import axios from 'axios';

const baseURL = 'https://www.omdbapi.com';

const instance = axios.create({
    baseURL,
});

export default instance;