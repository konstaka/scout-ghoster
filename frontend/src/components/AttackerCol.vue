<template>
  <div>
    <div class="attacker">
      {{ attacker.villageName }} ({{ attacker.x }}|{{ attacker.y }})
    </div>
    <TimeBox
      v-for="target of $store.state.targets"
      :key="`time${target.x}${target.y}`"
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
.attacker {
  height: 100px;
}
</style>
