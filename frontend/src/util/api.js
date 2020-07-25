import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import HttpStatus from 'http-status-codes'

export default () => {
  const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/',
    headers: {
      Authorization: `Bearer ${Vue.$cookies.get('id_token')}`
    }
  })
  api.interceptors.response.use(undefined, (err) => {
    let title = 'Error'
    let body = 'N/A'
    if (err.response.data && err.response.data.message) {
      body = err.response.data.message
    }
    // Logout if auth is invalid
    if (err.response && err.response.status === HttpStatus.UNAUTHORIZED) {
      title = 'Authentication error'
      if (body === 'Session expired') {
        title = 'Session expired'
        body = 'Please log in again.'
      }
      store.commit('SIGN_OUT')
      if (router.history.current.path !== '/login') {
        router.push('/login')
      }
    }
    if (err.response && err.response.status === HttpStatus.FORBIDDEN) {
      title = 'Forbidden'
    }
    window.VoerroModal.show({
      title,
      body,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    })
    return Promise.resolve(err)
  })
  return api
}
