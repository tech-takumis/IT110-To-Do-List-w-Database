import Axios from 'axios'

const axios = Axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios
