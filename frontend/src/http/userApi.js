import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/registration', { email, password });

        // Check if there are errors in the response
        if (data.errors) {
            return (data)
        } else {
            localStorage.setItem('token', data);
            return jwt_decode(data);
        }
    } catch (error) {
        // Handle network or other errors that may occur during the request
        console.error('Error during registration:', error.message);
    }
};


export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
    localStorage.setItem('token', data)
    return jwt_decode(data)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data)
    return jwt_decode(data)
}