import axios from 'axios'

const api = axios.create({
    baseURL: ' https://7139-2401-4900-1c33-7ceb-f445-907c-3448-e0ea.ngrok-free.app',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;