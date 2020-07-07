import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Modal, VoerroModal } from '@voerro/vue-modal'

Vue.component('modal', Modal)
window.VoerroModal = VoerroModal

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
