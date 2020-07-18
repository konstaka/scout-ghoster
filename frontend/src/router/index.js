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
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // Always allow navigating to login page
  if (to.path === '/login') {
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
  if ((store.state.roles.includes('admin') || store.state.roles.includes('defcoord'))
    && store.state.attackers.length === 0) {
    store.dispatch('getInfo')
  } else {
    if (store.state.roles.includes('scout') && store.state.scouts.length === 0) {
      store.dispatch('getScouts')
    }
    if (store.state.roles.includes('ghost') && store.state.ghosts.length === 0) {
      store.dispatch('getGhosts')
    }
  }
  next()
})

export default router
