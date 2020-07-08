import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Targets from '@/views/Targets'
import Attackers from '@/views/Attackers'
import Ghosts from '@/views/Ghosts'
import Messages from '@/views/Messages'
import Scouts from '@/views/Scouts'
import store from '@/store'
import jwtDecode from 'jwt-decode'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/targets',
    name: 'Targets',
    component: Targets
  },
  {
    path: '/attackers',
    name: 'Attackers',
    component: Attackers
  },
  {
    path: '/scouts',
    name: 'Scouts',
    component: Scouts
  },
  {
    path: '/ghosts',
    name: 'Ghosts',
    component: Ghosts
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  const idToken = Vue.$cookies.get('id_token')
  if (!idToken || jwtDecode(idToken).exp * 1000 < new Date()) {
    next('/login')
    return
  }
  if (store.state.attackers.length === 0) {
    store.dispatch('getInfo')
  }
  next()
})

export default router
