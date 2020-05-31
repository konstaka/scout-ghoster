export default {
  updateMsgs (context, { target, attacker, selected }) {
    context.commit('updateMsgs', { target, attacker, selected })
  }
}
