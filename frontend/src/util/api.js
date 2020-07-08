import axios from 'axios'
import Vue from 'vue'

export default () => {
  const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/',
    headers: {
      Authorization: `Bearer ${Vue.$cookies.get('id_token')}`
    }
  })
  return api
}
