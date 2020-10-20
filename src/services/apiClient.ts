import Axios from 'axios'

const apiClient = Axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

apiClient.interceptors.request.use(config => ({
    ...config,
    headers: {
        ...config.headers,
        // Authorization: ''
    },
}))

export default apiClient
