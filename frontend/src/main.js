import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Modal, VoerroModal } from '@voerro/vue-modal'
import GAuth from 'vue-google-oauth2'
import VueCookies from 'vue-cookies'

Vue.component('modal', Modal)
window.VoerroModal = VoerroModal

Vue.use(GAuth, {
  clientId: process.env.VUE_APP_CLIENT_ID,
  prompt: 'select_account'
})

Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
