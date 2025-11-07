import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://petshop-tt0t.onrender.com'
})