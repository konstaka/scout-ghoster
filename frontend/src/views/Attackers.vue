<template>
  <div class="attackers_container">
    <AttackerRow
      v-for="attacker of $store.state.attackers"
      :key="`attacker${attacker.x}${attacker.y}`"
      :attacker="attacker"
      :unit-speeds="$store.state.unitSpeeds"
      :arte-speeds="$store.state.arteSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
      :maps="$store.state.maps"
    />
    <InsertAttacker
      :unit-speeds="$store.state.unitSpeeds"
      :arte-speeds="$store.state.arteSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
      :maps="$store.state.maps"
    />
  </div>
</template>

<script>
import AttackerRow from '@/components/AttackerRow'
import InsertAttacker from '@/components/InsertAttacker'
export default {
  name: 'Attackers',
  components: {
    AttackerRow,
    InsertAttacker
  }
}
</script>

<style scoped>
.attackers_container {
  padding: 0 10%;
  margin-bottom: 300px;
}
</style>
