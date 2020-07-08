import SettingsService from '@/services/settings'
import OperationMetaService from '@/services/operationMeta'
import TargetService from '@/services/target'
import AttackerService from '@/services/attacker'
import ScoutService from '@/services/scout'
import GhostService from '@/services/ghost'
import { groupBy } from 'underscore'

export default {
  updateSelections (context, { target, attacker, selected }) {
    if (selected) {
      context.commit('addSelection', { target, attacker })
    } else {
      context.commit('removeSelection', { target, attacker })
    }
  },
  async getInfo (context) {
    context.dispatch('getSettings')
    context.dispatch('getOperationMeta')
    context.dispatch('getTargets')
    context.dispatch('getFilter')
    context.dispatch('getAttackers')
    context.dispatch('getScouts')
    context.dispatch('getGhosts')
  },
  async getSettings (context) {
    const settings = await SettingsService.get()
    context.commit('setConfig', settings)
  },
  async getOperationMeta (context) {
    const data = await OperationMetaService.load()
    context.commit('setOpsTime', data.hittingTime)
  },
  async getTargets (context) {
    const res = await TargetService.getAll()
    const groupedRes = groupBy(res, 'playerName')
    const players = []
    Object.keys(groupedRes)
      .sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase())
      })
      .forEach((key) => {
        players.push(groupedRes[key].sort((a, b) => {
          return a.villageName.localeCompare(b.villageName)
        }))
      })
    context.commit('setTargets', players)
  },
  async getFilter (context) {
    const res = await TargetService.getFilter()
    context.commit('setFilter', res)
  },
  async getAttackers (context) {
    const res = await AttackerService.getAll()
    context.commit('setAttackers', res)
  },
  async getScouts (context) {
    const res = await ScoutService.getAll()
    context.commit('setScouts', res)
  },
  async getGhosts (context) {
    const res = await GhostService.getAll()
    context.commit('setGhosts', res)
  }
}
