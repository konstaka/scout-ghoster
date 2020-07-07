import TargetService from '@/services/target'
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
    context.dispatch('getTargets')
    context.dispatch('getAttackers')
  },
  async getTargets (context) {
    const res = await TargetService.getAll()
    context.commit('setTargets', res)
  },
  async getAttackers (context) {
    const res = await AttackerService.getAll()
    context.commit('setAttackers', res)
  }
}
