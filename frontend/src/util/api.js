import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'

export default () => {
  const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/',
    headers: {
      Authorization: `Bearer ${Vue.$cookies.get('id_token')}`
    }
  })
  api.interceptors.response.use(undefined, (err) => {
    // Logout if auth is invalid
    if (err.response && err.response.status === 401) {
      let message = 'N/A'
      if (err.response.data && err.response.data.message) {
        message = err.response.data.message
      }
      if (message === 'Session expired') {
        window.VoerroModal.show({
          title: 'Session expired',
          body: 'Please log in again.',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
      } else {
        window.VoerroModal.show({
          title: 'Authentication error',
          body: `Error message: ${message}`,
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
      }
      store.commit('SIGN_OUT')
      if (router.history.current.path !== '/login') {
        router.push('/login')
      }
    }
    return Promise.reject(err)
  })
  return api
}
