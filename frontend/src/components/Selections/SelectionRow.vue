<template>
  <div class="selection_row">
    <div class="data_item player_name">
      {{ selection.attacker.villageName }} ({{ selection.attacker.xCoord }}|{{ selection.attacker.yCoord }})
    </div>
    <div class="data_item sending_time">
      sends at {{ sendingTime }} to
    </div>
    <div class="data_item player_name">
      {{ selection.target.villageName }} ({{ selection.target.xCoord }}|{{ selection.target.yCoord }})
    </div>
    <div class="data_item scout">
      scout:
      <select
        v-model="mutableSelection.scout"
        class="scout_dropdown"
      >
        <option :value="null" />
        <option
          v-for="scout of $store.state.scouts"
          :key="`scout${scout.xCoord}${scout.yCoord}`"
          :value="{
            player: scout.player,
            _id: scout._id,
            __v: scout.__v,
            xCoord: scout.xCoord,
            yCoord: scout.yCoord,
            arteSpeed: scout.arteSpeed,
            scoutAmount: scout.scoutAmount,
            scoutArte: scout.scoutArte,
            tournamentSquare: scout.tournamentSquare,
            unitSpeed: scout.unitSpeed,
            villageName: scout.villageName
          }"
        >
          {{ scout.player }} ({{ scout.xCoord }}|{{ scout.yCoord }}) {{ scout.scoutArte }}x {{ scout.scoutAmount }} [{{ scoutSendingTime(scout) }}]
        </option>
      </select>
    </div>
    <div class="data_item ghost">
      ghost:
      <select
        v-model="mutableSelection.ghost"
        class="ghost_dropdown"
      >
        <option :value="null" />
        <option
          v-for="ghost of $store.state.ghosts"
          :key="`ghost${ghost.xCoord}${ghost.yCoord}`"
          :value="{
            player: ghost.player,
            _id: ghost._id,
            __v: ghost.__v,
            xCoord: ghost.xCoord,
            yCoord: ghost.yCoord,
            arteSpeed: ghost.arteSpeed,
            scoutAmount: ghost.scoutAmount,
            scoutArte: ghost.scoutArte,
            tournamentSquare: ghost.tournamentSquare,
            unitSpeed: ghost.unitSpeed,
            villageName: ghost.villageName,
            heroBoots: ghost.heroBoots
          }"
        >
          {{ ghost.player }} ({{ ghost.xCoord }}|{{ ghost.yCoord }}) {{ ghost.ghostAmount }}{{ ghost.unitName }}@{{ ghostTravelString(ghost) }} [{{ ghostSendingTime(ghost) }}]
        </option>
      </select>
    </div>
    <div
      class="data_item delete_button"
      @click="deleteSelection"
    >
      Delete
    </div>
  </div>
</template>

<script>
import {
  getSendingTime,
  getScoutSend,
  getGhostTravelString,
  getGhostSend
} from '@/util/travelTime'
import SelectionsService from '@/services/selections'
export default {
  name: 'SelectionRow',
  props: [
    'selection'
  ],
  data: () => ({
    mutableSelection: {},
    loaded: false,
    options: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  }),
  computed: {
    sendingTime () {
      return getSendingTime(this.selection.target, this.selection.attacker)
        .toLocaleTimeString('en-GB', this.options)
    }
  },
  watch: {
    mutableSelection: {
      deep: true,
      handler () {
        if (this.loaded) {
          this.updateSelection()
        }
      }
    }
  },
  mounted () {
    this.mutableSelection = {
      ...this.selection
    }
    for (const storedScout of this.$store.state.scouts) {
      if (this.mutableSelection.scout
        && storedScout._id === this.mutableSelection.scout._id) {
        this.mutableSelection.scout = storedScout
      }
    }
    for (const storedGhost of this.$store.state.ghosts) {
      if (this.mutableSelection.ghost
        && storedGhost._id === this.mutableSelection.ghost._id) {
        this.mutableSelection.ghost = storedGhost
      }
    }
    this.$nextTick(() => {
      this.loaded = true
    })
  },
  methods: {
    scoutSendingTime (scout) {
      return getScoutSend(this.selection.target, this.selection.attacker, scout)
        .toLocaleTimeString('en-GB', this.options)
    },
    ghostSendingTime (ghost) {
      return getGhostSend(this.selection.target, this.selection.attacker, ghost)
        .toLocaleTimeString('en-GB', this.options)
    },
    ghostTravelString (ghost) {
      return getGhostTravelString(this.selection.attacker, ghost)
    },
    async updateSelection () {
      await SelectionsService.updateSelection(this.mutableSelection)
      this.$store.dispatch('updateCycle')
    },
    async deleteSelection () {
      window.VoerroModal.show({
        title: 'Confirm:',
        body: `Delete (${this.selection.attacker.xCoord}|${this.selection.attacker.yCoord})
          to (${this.selection.target.xCoord}|${this.selection.target.yCoord})?`,
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Delete',
            handler: async () => {
              const selectionId = this.selection._id
              this.$store.commit('UPDATE_SELECTION', {
                target: this.selection.target,
                attacker: this.selection.attacker,
                selected: false
              })
              await SelectionsService.delete(selectionId)
              this.$store.dispatch('updateCycle')
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.selection_row {
  width: 100%;
  min-width: 1330px;
  margin: 18px auto;
}

.data_item {
  width: 7%;
  max-height: 22px;
  display: inline-block;
  overflow: hidden;
  text-align: left;
}

.player_name {
  margin-right: 5px;
  width: 220px;
  font-style: italic;
}

.sending_time {
  width: auto;
  margin-right: 10px;
}

.scout {
  width: 266px;
  margin-left: 15px;
}

.ghost {
  width: 306px;
  margin-left: 15px;
}

.delete_button {
  width: 5%;
  height: 17px;
  margin: 1px 20px;
  font-size: 0.9em;
  text-align: center;
  border: 1px solid #666666;
  background: #f4ebf0;
  cursor: pointer;
}

.scout_dropdown {
  width: 215px;
  background: #ebf0f4;
  cursor: pointer;
}

.ghost_dropdown {
  width: 255px;
  background: #ebf0f4;
  cursor: pointer;
}
</style>
