import { MovieProps } from "@/components/movie/Movie.type";

export function getFromStorage(key: string) {
    if (!key) {
        return null;
    }
    try {
        const valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return [];
    } catch (err) {
        return [];
    }
}

export function setInStorage(key: string, obj: MovieProps[]) {
    if (!key) {
        console.error("Error: Key is missing");
    }
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}
export function removeFromStorage(key: string) {
    if (!key) {
        console.error("Error: Key is missing");
    }
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error(err);
    }
}