import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Attackers from '../views/Attackers.vue'
import Ghosts from '../views/Ghosts.vue'
import Messages from '../views/Messages.vue'
import Scouts from '../views/Scouts.vue'
import Targets from '../views/Targets.vue'

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
    path: '/ghosts',
    name: 'Ghosts',
    component: Ghosts
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/scouts',
    name: 'Scouts',
    component: Scouts
  },
  {
    path: '/targets',
    name: 'Targets',
    component: Targets
  }
]

const router = new VueRouter({
  routes
})

export default router
