import axios from 'axios'

export const instanceAxios = axios.create({
    baseURL: 'http://localhost:7000'
})

export default instanceAxios

export function setToken(token: string) {
    console.log('estableciendo token')

    instanceAxios.defaults.headers.common.Authorization = `Bearer ${token}`
}
