import axios from 'axios'

export const Address = '2939-2401-4900-1c33-46c7-6883-2bb9-f178-9fe0.ngrok-free.app';

const api = axios.create({
    baseURL: 'https://' + Address,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;