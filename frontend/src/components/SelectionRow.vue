<template>
  <div class="selection_row">
    <div class="data_item player_name">
      {{ selection.attacker.player }} ({{ selection.attacker.xCoord }}|{{ selection.attacker.yCoord }})
    </div>
    <div class="data_item sending_time">
      sends at {{ sendingTime }} to
    </div>
    <div class="data_item player_name">
      {{ selection.target.playerName }} ({{ selection.target.xCoord }}|{{ selection.target.yCoord }})
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
            xCoord: scout.xCoord,
            yCoord: scout.yCoord
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
            xCoord: ghost.xCoord,
            yCoord: ghost.yCoord
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
      this.$store.commit('UPDATE_SELECTION', {
        target: this.mutableSelection.target,
        attacker: this.mutableSelection.attacker,
        scout: this.mutableSelection.scout,
        ghost: this.mutableSelection.ghost,
        updated: true,
        selected: true
      })
      await SelectionsService.put(this.$store.state.selections)
      this.$store.dispatch('getSelections')
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
              this.$store.commit('UPDATE_SELECTION', {
                target: this.selection.target,
                attacker: this.selection.attacker,
                selected: false
              })
              await SelectionsService.put(this.$store.state.selections)
              this.$store.dispatch('getSelections')
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
  width: 12%;
  font-style: italic;
}

.sending_time {
  width: 12%;
}

.scout {
  width: 25%;
}

.ghost {
  width: 28%;
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
  width: 280px;
  background: #ebf0f4;
  cursor: pointer;
}

.ghost_dropdown {
  width: 320px;
  background: #ebf0f4;
  cursor: pointer;
}
</style>
