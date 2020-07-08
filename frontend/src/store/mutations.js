import { updateField } from 'vuex-map-fields'
export default {
  updateField,
  addSelection (state, { target, attacker }) {
    state.selections.push({
      target,
      attacker
    })
  },
  removeSelection (state, { target, attacker }) {
    state.selections = state.selections.filter((msg) => {
      return msg.target.x !== target.x
        || msg.target.y !== target.y
        || msg.attacker.x !== attacker.x
        || msg.attacker.y !== attacker.y
    })
  },
  setConfig (state, settings) {
    state.serverConfig.speed = settings.speed
    state.serverConfig.size = settings.size
  },
  setOpsTime (state, hittingTime) {
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
  setTargets (state, targets) {
    state.targets = targets
  },
  setFilter (state, filter) {
    state.filter = filter
  },
  setAttackers (state, attackers) {
    state.attackers = attackers
  },
  setScouts (state, scouts) {
    state.scouts = scouts
  },
  setGhosts (state, ghosts) {
    state.ghosts = ghosts
  }
}
