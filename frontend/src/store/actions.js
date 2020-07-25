import SettingsService from '@/services/settings'
import OperationMetaService from '@/services/operationMeta'
import TargetService from '@/services/target'
import AttackerService from '@/services/attacker'
import ScoutService from '@/services/scout'
import GhostService from '@/services/ghost'
import SelectionsService from '@/services/selections'
import { groupBy } from 'underscore'

export default {
  async getInfo (context) {
    context.dispatch('getSettings')
    context.dispatch('getOperationMeta')
    context.dispatch('getTargets')
    context.dispatch('getFilter')
    context.dispatch('getAttackers')
    context.dispatch('getScouts')
    context.dispatch('getGhosts')
    context.dispatch('getSelections')
    context.commit('LOADED')
  },
  async getSettings (context) {
    const settings = await SettingsService.get()
    context.commit('SET_CONFIG', settings)
  },
  async getOperationMeta (context) {
    const data = await OperationMetaService.load()
    context.commit('SET_OPS_TIME', data.hittingTime)
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
    context.commit('SET_TARGETS', players)
  },
  async getFilter (context) {
    const res = await TargetService.getFilter()
    context.commit('SET_FILTER', res)
  },
  async getAttackers (context) {
    const res = await AttackerService.getAll()
    context.commit('SET_ATTACKERS', res)
  },
  async getScouts (context) {
    const res = await ScoutService.getAll()
    context.commit('SET_SCOUTS', res)
  },
  async getGhosts (context) {
    const res = await GhostService.getAll()
    context.commit('SET_GHOSTS', res)
  },
  async getSelections (context) {
    const res = await SelectionsService.get()
    context.commit('SET_SELECTIONS', res.sort((a, b) => {
      return a.attackerId === b.attackerId
        ? a.targetId.localeCompare(b.targetId)
        : a.attackerId.localeCompare(b.attackerId)
    }))
  }
}
