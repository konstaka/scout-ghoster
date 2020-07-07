import axios from 'axios'

export default () => {
  const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/'
  })
  return api
}
