import SettingsService from '@/services/settings'
import OperationMetaService from '@/services/operationMeta'
import TargetService from '@/services/target'
import AttackerService from '@/services/attacker'
import ScoutService from '@/services/scout'
import GhostService from '@/services/ghost'
import SelectionsService from '@/services/selections'
import { groupBy } from 'underscore'

export default {
  async updateCycle (context) {
    if (context.state.roles.includes('admin')) {
      await context.dispatch('getInfo')
      context.dispatch('getScoutCommands')
      context.dispatch('getGhostCommands')
    } else if (context.state.roles.includes('defcoord')) {
      context.dispatch('getInfo')
    } else if (context.state.roles.includes('scout')) {
      await context.dispatch('getScouts')
      context.dispatch('getScoutCommands')
    } else if (context.state.roles.includes('ghost')) {
      await context.dispatch('getGhosts')
      context.dispatch('getGhostCommands')
    }
    context.commit('LOADED')
  },
  async getInfo (context) {
    await context.dispatch('getSettings')
    await context.dispatch('getOperationMeta')
    await context.dispatch('getTargets')
    await context.dispatch('getFilter')
    await context.dispatch('getAttackers')
    await context.dispatch('getScouts')
    await context.dispatch('getGhosts')
    await context.dispatch('getSelections')
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
    const compiledSelections = []
    const selections = await SelectionsService.get()
    for (const selection of selections) {
      const compiledSelection = {
        ...selection
      }
      for (const attacker of context.state.attackers) {
        if (attacker._id === compiledSelection.attackerId) {
          compiledSelection.attacker = attacker
          break
        }
      }
      for (const targetPlayer of context.state.targets) {
        for (const targetVillage of targetPlayer) {
          if (targetVillage._id === compiledSelection.targetId) {
            compiledSelection.target = targetVillage
            break
          }
        }
      }
      for (const scout of context.state.scouts) {
        if (scout._id === compiledSelection.scoutId) {
          compiledSelection.scout = scout
          break
        }
      }
      for (const ghost of context.state.ghosts) {
        if (ghost._id === compiledSelection.ghostId) {
          compiledSelection.ghost = ghost
          break
        }
      }
      compiledSelections.push(compiledSelection)
    }
    context.commit('SET_SELECTIONS', compiledSelections.sort(
      (a, b) => {
        return a.attackerId === b.attackerId
          ? a.targetId.localeCompare(b.targetId)
          : a.attackerId.localeCompare(b.attackerId)
      }
    ))
  },
  async forgetAttacker (context, attacker) {
    context.state.selections.filter(async (sel) => {
      const matches = sel.attackerId === attacker._id
      if (matches) {
        await SelectionsService.delete(sel._id)
      }
      return !matches
    })
  },
  async forgetScout (context, scout) {
    const selectionsWithScout = context.state.selections.filter(
      (sel) => sel.scoutId === scout._id
    )
    for (const selection of selectionsWithScout) {
      selection.scout = null
      await SelectionsService.updateSelection(selection)
    }
    context.dispatch('updateCycle')
  },
  async forgetGhost (context, ghost) {
    const selectionsWithGhost = context.state.selections.filter(
      (sel) => sel.ghostId === ghost._id
    )
    for (const selection of selectionsWithGhost) {
      selection.ghost = null
      await SelectionsService.updateSelection(selection)
    }
    context.dispatch('updateCycle')
  },
  async getScoutCommands (context) {
    const compiledCommands = []
    const commands = await ScoutService.getCommands()
    for (const command of commands) {
      const compiledCommand = {
        ...command
      }
      for (const attacker of context.state.attackers) {
        if (attacker._id === compiledCommand.attackerId) {
          compiledCommand.attacker = attacker
          break
        }
      }
      for (const targetPlayer of context.state.targets) {
        for (const targetVillage of targetPlayer) {
          if (targetVillage._id === compiledCommand.targetId) {
            compiledCommand.target = targetVillage
            break
          }
        }
      }
      for (const scout of context.state.scouts) {
        if (scout._id === compiledCommand.scoutId) {
          compiledCommand.scout = scout
          break
        }
      }
      compiledCommands.push(compiledCommand)
    }
    context.commit('SET_SCOUT_COMMANDS', compiledCommands)
  },
  async getGhostCommands (context) {
    const compiledCommands = []
    const commands = await GhostService.getCommands()
    for (const command of commands) {
      const compiledCommand = {
        ...command
      }
      for (const attacker of context.state.attackers) {
        if (attacker._id === compiledCommand.attackerId) {
          compiledCommand.attacker = attacker
          break
        }
      }
      for (const targetPlayer of context.state.targets) {
        for (const targetVillage of targetPlayer) {
          if (targetVillage._id === compiledCommand.targetId) {
            compiledCommand.target = targetVillage
            break
          }
        }
      }
      for (const ghost of context.state.ghosts) {
        if (ghost._id === compiledCommand.ghostId) {
          compiledCommand.ghost = ghost
          break
        }
      }
      compiledCommands.push(compiledCommand)
    }
    context.commit('SET_GHOST_COMMANDS', compiledCommands)
  }
}
