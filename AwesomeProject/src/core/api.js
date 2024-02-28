import axios from 'axios'

export const Address = '248c-2401-4900-1c33-7ceb-f445-907c-3448-e0ea.ngrok-free.app';

const api = axios.create({
    baseURL: 'https://' + Address,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;