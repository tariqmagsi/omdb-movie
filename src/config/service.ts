import { get } from '.';

const API = `?apikey=${process.env.NEXT_PUBLIC_OMDB_API}&`

export const Service = {
    searchMovie: async (endPoint: string) => {
        let result = await get(API + endPoint);
        if (result.status === 200) return result.data;
        else throw result;
    }
};

