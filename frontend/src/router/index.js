import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Targets from '@/views/Targets'
import Attackers from '@/views/Attackers'
import Scouts from '@/views/Scouts'
import Ghosts from '@/views/Ghosts'
import Selections from '@/views/Selections'
import ScoutCommands from '@/views/ScoutCommands'
import GhostCommands from '@/views/GhostCommands'
import Incomings from '@/views/Incomings'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    roles: []
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    roles: ['admin', 'defcoord']
  },
  {
    path: '/targets',
    name: 'Targets',
    component: Targets,
    roles: ['admin', 'defcoord']
  },
  {
    path: '/attackers',
    name: 'Attackers',
    component: Attackers,
    roles: ['admin', 'defcoord']
  },
  {
    path: '/scouts',
    name: 'Scouts',
    component: Scouts,
    roles: ['admin', 'defcoord', 'scout']
  },
  {
    path: '/ghosts',
    name: 'Ghosts',
    component: Ghosts,
    roles: ['admin', 'defcoord', 'ghost']
  },
  {
    path: '/selections',
    name: 'Selections',
    component: Selections,
    roles: ['admin', 'defcoord']
  },
  {
    path: '/scoutcommands',
    name: 'Scout Commands',
    component: ScoutCommands,
    roles: ['admin', 'scout']
  },
  {
    path: '/ghostcommands',
    name: 'Ghost Commands',
    component: GhostCommands,
    roles: ['admin', 'ghost']
  },
  {
    path: '/incomings',
    name: 'Incomings',
    component: Incomings,
    roles: []
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // Always allow navigating to login and incomings pages
  if (to.path === '/login' || to.path === '/incomings') {
    next()
    return
  }

  // For other pages, check user auth status
  // Jut see if token exists
  const idToken = Vue.$cookies.get('id_token')
  if (!idToken) {
    store.commit('SIGN_OUT')
    next('/login')
    return
  }

  // User is signed in
  store.commit('SIGN_IN')
  store.commit('SET_USER_ROLES', Vue.$cookies.get('roles').split(','))
  if (!store.state.loaded) {
    await store.dispatch('updateCycle')
  }
  next()
})

export default router
