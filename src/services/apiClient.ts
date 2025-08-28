import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://abitus-api.geia.vip/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('Erro:', error)
    return Promise.reject(error)
  },
)

export default apiClient
