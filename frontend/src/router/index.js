import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Attackers from '../views/Attackers'
import Ghosts from '../views/Ghosts'
import Messages from '../views/Messages'
import Scouts from '../views/Scouts'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  if (store.state.attackers.length === 0) {
    store.dispatch('getInfo')
  }
  next()
})

export default router
