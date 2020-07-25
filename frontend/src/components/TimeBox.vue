<template>
  <div
    v-if="!filtered || isVisible"
    class="timebox"
    :class="{ pressed: selected }"
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
  data: () => ({
    selected: false
  }),
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
    }
  },
  mounted () {
    for (const selection of this.$store.state.selections) {
      if (selection.targetId === this.target._id
        && selection.attackerId === this.attacker._id) {
        this.selected = true
        break
      }
    }
  },
  methods: {
    async toggleSelected () {
      this.selected = !this.selected
      this.$store.commit('UPDATE_SELECTION', {
        target: this.target._id,
        attacker: this.attacker._id,
        selected: this.selected
      })
      await SelectionsService.put(this.$store.state.selections)
      this.$store.dispatch('getSelections')
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
