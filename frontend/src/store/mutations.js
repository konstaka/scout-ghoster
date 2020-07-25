import { updateField } from 'vuex-map-fields'
import initialState from './state'
import Vue from 'vue'
export default {
  updateField,
  UPDATE_SELECTION (state, { target, attacker, scout, ghost, updated, selected }) {
    if (updated) {
      state.selections = state.selections.filter(
        (sel) => {
          return sel.targetId !== target._id
            || sel.attackerId !== attacker._id
        }
      )
      state.selections.push({
        attackerId: attacker._id,
        attacker,
        targetId: target._id,
        target,
        scoutId: scout ? scout._id : 0,
        scout,
        ghostId: ghost ? ghost._id : 0,
        ghost
      })
    } else if (selected) {
      state.selections.push({
        attackerId: attacker._id,
        attacker,
        targetId: target._id,
        target,
        scoutId: scout ? scout._id : 0,
        scout,
        ghostId: ghost ? ghost._id : 0,
        ghost
      })
    } else {
      state.selections = state.selections.filter(
        (sel) => {
          return sel.targetId !== target._id
            || sel.attackerId !== attacker._id
        }
      )
    }
    state.selections.sort((a, b) => {
      return a.attackerId === b.attackerId
        ? a.targetId.localeCompare(b.targetId)
        : a.attackerId.localeCompare(b.attackerId)
    })
  },
  SET_SELECTIONS (state, selections) {
    state.selections = selections
  },
  SIGN_IN (state) {
    state.isSignIn = true
  },
  SIGN_OUT (state) {
    for (const prop in state) {
      state[prop] = initialState[prop]
    }
    Vue.$cookies.remove('id_token')
  },
  SET_USER_ROLES (state, roles) {
    state.roles = roles.filter((r) => r.length > 0)
  },
  LOADED (state) {
    state.loaded = true
  },
  SET_CONFIG (state, settings) {
    state.serverConfig.speed = settings.speed
    state.serverConfig.size = settings.size
  },
  SET_OPS_TIME (state, hittingTime) {
    const opsHittingDay = new Date(hittingTime)
    state.opsHittingDay = opsHittingDay
    const opsHittingTime = {
      HH: opsHittingDay.getHours().toString(),
      mm: opsHittingDay.getMinutes().toString(),
      ss: opsHittingDay.getSeconds().toString()
    }
    for (const key of Object.keys(opsHittingTime)) {
      if (opsHittingTime[key].length < 2) {
        opsHittingTime[key] = '0' + opsHittingTime[key]
      }
    }
    state.opsHittingTime = opsHittingTime
  },
  SET_TARGETS (state, targets) {
    state.targets = targets
  },
  SET_FILTER (state, filter) {
    state.filter = filter
  },
  SET_ATTACKERS (state, attackers) {
    state.attackers = attackers
  },
  SET_SCOUTS (state, scouts) {
    state.scouts = scouts
  },
  SET_GHOSTS (state, ghosts) {
    state.ghosts = ghosts
  }
}
