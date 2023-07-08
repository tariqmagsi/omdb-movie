import Axios from '../axios';
import { errorHandler } from './errorHandler';

export const headers = {
    'Content-Type': 'application/json',
};

export const get = async (endPoint: string) => {
    try {
        const result = await Axios.get(endPoint, {
            headers,
        });
        return result;
    } catch (e: any) {
        console.log('post -> e', e);
        throw errorHandler(e);
    }
};