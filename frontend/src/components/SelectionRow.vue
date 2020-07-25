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
      Scout:
      <select
        v-model="mutableSelection.scout"
        class="dropdown"
      >
        <option :value="null" />
        <option
          v-for="scout of $store.state.scouts"
          :key="`scout${scout.xCoord}${scout.yCoord}`"
          :value="{
            player: scout.player,
            xCoord: scout.xCoord,
            yCoord: scout.yCoord,
            scoutArte: scout.scoutArte,
            scoutAmount: scout.scoutAmount,
            arteSpeed: scout.arteSpeed,
            tournamentSquare: scout.tournamentSquare,
            heroBoots: 0
          }"
        >
          {{ scout.player }} ({{ scout.xCoord }}|{{ scout.yCoord }}) {{ scout.scoutArte }}x {{ scout.scoutAmount }} [{{ getSend(selection.attacker, scout) }}]
        </option>
      </select>
    </div>
    <div class="data_item ghost">
      Ghost:
      <select
        v-model="mutableSelection.ghost"
        class="dropdown"
      >
        <option :value="null" />
        <option
          v-for="ghost of $store.state.ghosts"
          :key="`ghost${ghost.xCoord}${ghost.yCoord}`"
          :value="{
            player: ghost.player,
            xCoord: ghost.xCoord,
            yCoord: ghost.yCoord,
            ghostAmount: ghost.ghostAmount
          }"
        >
          {{ ghost.player }} ({{ ghost.xCoord }}|{{ ghost.yCoord }}) {{ ghost.ghostAmount }}
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
import { getTravelTime, getSendingTime } from '@/util/travelTime'
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
    getSend (target, sender) {
      return new Date(getSendingTime(this.selection.target, this.selection.attacker) - getTravelTime(target, sender) * 1000)
        .toLocaleTimeString('en-GB', this.options)
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
        body: `Delete (${this.selection.attacker.x}|${this.selection.attacker.y})
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
  width: 11%;
}

.sending_time {
  width: 12%;
}

.scout {
  width: 22%;
}

.ghost {
  width: 22%;
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

.dropdown {
  width: 250px;
  background: #ebf0f4;
  cursor: pointer;
}
</style>
