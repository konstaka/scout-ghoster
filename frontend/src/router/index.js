import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Attackers from '../views/Attackers'
import Ghosts from '../views/Ghosts'
import Messages from '../views/Messages'
import Scouts from '../views/Scouts'
import Targets from '../views/Targets'

Vue.use(VueRouter)

const routes = [
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

export default router
