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
        scoutId: scout ? scout._id : undefined,
        scoutName: scout ? scout.player : undefined,
        scout,
        ghostId: ghost ? ghost._id : undefined,
        ghostName: ghost ? ghost.player : undefined,
        ghost
      })
    } else if (selected) {
      state.selections.push({
        attackerId: attacker._id,
        attacker,
        targetId: target._id,
        target,
        scoutId: scout ? scout._id : undefined,
        scoutName: scout ? scout.player : undefined,
        scout,
        ghostId: ghost ? ghost._id : undefined,
        ghostName: ghost ? ghost.player : undefined,
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
    state.serverConfig = settings
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
  SET_FLEX_SECONDS (state, flexSeconds) {
    state.flexSeconds = flexSeconds
  },
  CHANGE_FLEX (state, { target, attacker, amount }) {
    state.flexSeconds[target._id][attacker._id] += amount
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
  },
  SET_SCOUT_COMMANDS (state, commands) {
    state.scoutCommands = commands
  },
  SET_GHOST_COMMANDS (state, commands) {
    state.ghostCommands = commands
  }
}
