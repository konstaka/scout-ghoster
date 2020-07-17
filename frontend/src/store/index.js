import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import initialState from './state'

Vue.use(Vuex)

const state = Object.assign({}, initialState)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
