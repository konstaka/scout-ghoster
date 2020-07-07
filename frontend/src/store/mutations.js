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
  setTargets (state, targets) {
    state.targets = targets
  },
  setAttackers (state, attackers) {
    state.attackers = attackers
  }
}
