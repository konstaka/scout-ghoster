import { updateField } from 'vuex-map-fields'
export default {
  updateField,
  updateMsgs (state, { target, attacker, selected }) {
    if (selected) {
      state.messages.push({
        target,
        attacker
      })
    } else {
      state.messages = state.messages.filter((msg) => {
        return msg.target.x !== target.x
          || msg.target.y !== target.y
          || msg.attacker.x !== attacker.x
          || msg.attacker.y !== attacker.y
      })
    }
  },
  setAttackers (state, attackers) {
    state.attackers = attackers
  }
}
