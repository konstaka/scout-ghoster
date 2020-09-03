<template>
  <div>
    <div
      v-for="target of $store.state.targets"
      :key="target[0].playerName"
    >
      <div
        v-if="target.some((village) => $store.state.filter[village.coordId])"
        class="player_padding"
      />
      <TimeBox
        v-for="village of target"
        :key="`time${attacker.xCoord}${attacker.yCoord}${village.xCoord}${village.yCoord}`"
        :attacker="attacker"
        :target="village"
        :filtered="true"
      />
    </div>
  </div>
</template>

<script>
import TimeBox from '@/components/Home/AttackerCol/TimeBox'
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
