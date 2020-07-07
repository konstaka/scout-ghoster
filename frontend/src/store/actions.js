import AttackerService from '@/services/attacker'

export default {
  updateSelections (context, { target, attacker, selected }) {
    if (selected) {
      context.commit('addSelection', { target, attacker })
    } else {
      context.commit('removeSelection', { target, attacker })
    }
  },
  async getInfo (context) {
    context.dispatch('getAttackers')
  },
  async getAttackers (context) {
    const res = await AttackerService.getAll()
    context.commit('setAttackers', res)
  }
}
