import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_OMDB_API_URL}`;

const instance = axios.create({
    baseURL,
});

export default instance;