<template>
  <div
    v-if="!filtered || isVisible"
    class="timebox"
    :class="{ pressed: isSelected }"
    @click="toggleSelected"
  >
    {{ sendingTime }}
  </div>
</template>

<script>
import { getSendingTime } from '@/util/travelTime'
import SelectionsService from '@/services/selections'
export default {
  name: 'TimeBox',
  props: [
    'target',
    'attacker',
    'filtered'
  ],
  computed: {
    sendingTime () {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      return getSendingTime(this.target, this.attacker)
        .toLocaleTimeString('en-GB', options)
    },
    isVisible () {
      return this.$store.state.filter[this.target.coordId]
    },
    isSelected () {
      return this.$store.state.selections.some(
        (selection) => {
          return selection.targetId === this.target._id
            && selection.attackerId === this.attacker._id
        }
      )
    }
  },
  methods: {
    selectionId () {
      for (const selection of this.$store.state.selections) {
        if (selection.targetId === this.target._id
          && selection.attackerId === this.attacker._id) {
          return selection._id
        }
      }
      return null
    },
    async toggleSelected () {
      const selectionId = this.selectionId()
      this.$store.commit('UPDATE_SELECTION', {
        target: {
          _id: this.target._id,
          xCoord: this.target.xCoord,
          yCoord: this.target.yCoord
        },
        attacker: {
          _id: this.attacker._id,
          xCoord: this.attacker.xCoord,
          yCoord: this.attacker.yCoord
        },
        scout: undefined,
        ghost: undefined,
        updated: false,
        selected: !this.isSelected
      })
      if (this.isSelected) {
        await SelectionsService.post({
          targetId: this.target._id,
          attackerId: this.attacker._id
        })
      } else {
        await SelectionsService.delete(selectionId)
      }
      this.$store.dispatch('updateCycle')
    }
  }
}
</script>

<style scoped>
.timebox {
  border: 1px solid #d2d2d2;
  cursor: pointer;
  max-height: 22px;
  overflow: hidden;
  padding-left: 5px;
}

.pressed {
  border-style: inset;
  background-color: #f4f4f4;
}
</style>
