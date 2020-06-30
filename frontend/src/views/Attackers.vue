<template>
  <div>
    <div
      v-for="attacker of $store.state.attackers"
      :key="`attacker${attacker.x}${attacker.y}`"
      :attacker="attacker"
      class="attacker_row"
    >
      {{ attacker.villageName }}
    </div>
  </div>
</template>

<script>
// import AttackerService from '@/services/attacker'
export default {
  name: 'Attackers',
  mounted () {
    this.$store.dispatch('getAttackers')
  }
}
</script>

<style scoped>
</style>
