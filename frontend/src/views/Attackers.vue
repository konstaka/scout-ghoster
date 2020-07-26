<template>
  <div class="attackers_container">
    <AttackerRow
      v-for="attacker of $store.state.attackers"
      :key="`attacker${attacker.xCoord}${attacker.yCoord}`"
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
import AttackerRow from '@/components/Attackers/AttackerRow'
import InsertAttacker from '@/components/Attackers/InsertAttacker'
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
  margin-bottom: 300px;
}

@media screen and (max-width: 1330px) {
  .attackers_container {
    overflow-x: scroll;
  }
}
</style>
