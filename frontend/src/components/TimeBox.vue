<template>
  <div
    class="timebox"
    :class="{ pressed: selected }"
    @click="toggleSelected"
  >
    {{ sendingTime }}
  </div>
</template>

<script>
import { getSendingTime } from '@/util/travelTime'
export default {
  name: 'TimeBox',
  props: [
    'target',
    'attacker'
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
    }
  },
  methods: {
    toggleSelected () {
      this.selected = !this.selected
      this.$store.dispatch('updateMsgs', {
        target: this.target,
        attacker: this.attacker,
        selected: this.selected
      })
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
