import axios from 'axios';
import { API_URL } from '../config';

export const api =axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type":"application/json",
    }
})
export const apiWithoutHeader =axios.create({
    baseURL : API_URL
})
export const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
