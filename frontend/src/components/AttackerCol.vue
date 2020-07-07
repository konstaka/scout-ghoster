<template>
  <div>
    <div
      v-for="target of $store.state.targets"
      :key="target[0].playerName"
    >
    <div class="player_padding" />
    <TimeBox
      v-for="village of target"
      :key="`time${attacker.x}${attacker.y}${village.xCoord}${village.yCoord}`"
      :attacker="attacker"
      :target="village"
    />
    </div>
  </div>
</template>

<script>
import TimeBox from '@/components/TimeBox'
export default {
  name: 'AttackerCol',
  components: {
    TimeBox
  },
  props: [
    'attacker'
  ]
}
</script>

<style scoped>
.player_padding {
  height: 42px;
}
</style>
