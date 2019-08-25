import axios from 'axios'

// baseURL: 'http://34.87.11.117'
// baseURL: 'http://localhost:3000'

const ax = axios.create({
    baseURL: 'http://localhost:3000'
})

export default ax