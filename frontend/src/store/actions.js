import AttackerService from '@/services/attacker'

export default {
  updateMsgs (context, { target, attacker, selected }) {
    context.commit('updateMsgs', { target, attacker, selected })
  },
  async getAttackers (context) {
    const res = await AttackerService.getAll()
    context.commit('setAttackers', res)
  }
}
