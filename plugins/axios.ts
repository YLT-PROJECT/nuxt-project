import axios from 'axios'

export const instanceAxios = axios.create({
    baseURL: 'http://localhost:7000'
})

export default instanceAxios
