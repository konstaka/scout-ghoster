<template>
  <div class="attackers_container">
    <AttackerRow
      v-for="attacker of $store.state.attackers"
      :key="`attacker${attacker.x}${attacker.y}`"
      :attacker="attacker"
      :unitSpeeds="$store.state.unitSpeeds"
      :arteSpeeds="$store.state.arteSpeeds"
      :tsLevels="$store.state.tsLevels"
      :heroBoots="$store.state.heroBoots"
      :maps="$store.state.maps"
    />
    <InsertAttacker
      :unitSpeeds="$store.state.unitSpeeds"
      :arteSpeeds="$store.state.arteSpeeds"
      :tsLevels="$store.state.tsLevels"
      :heroBoots="$store.state.heroBoots"
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
