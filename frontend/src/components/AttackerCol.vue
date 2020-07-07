<template>
  <div>
    <TimeBox
      v-for="target of $store.state.targets"
      :key="`time${attacker.x}${attacker.y}${target.xCoord}${target.yCoord}`"
      :attacker="attacker"
      :target="target"
    />
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
</style>
