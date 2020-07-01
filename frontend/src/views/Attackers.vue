<template>
  <div class="attackers_container">
    <AttackerRow
      v-for="attacker of $store.state.attackers"
      :key="`attacker${attacker.x}${attacker.y}`"
      :attacker="attacker"
    />
  </div>
</template>

<script>
import AttackerRow from '@/components/AttackerRow'
export default {
  name: 'Attackers',
  components: {
    AttackerRow
  }
}
</script>

<style scoped>
.attackers_container {
  margin-bottom: 300px;
}
</style>
