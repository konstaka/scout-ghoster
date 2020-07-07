<template>
  <div class="attackers_container">
    <AttackerRow
      v-for="attacker of $store.state.attackers"
      :key="`attacker${attacker.x}${attacker.y}`"
      :attacker="attacker"
      :unitSpeeds="unitSpeeds"
      :arteSpeeds="arteSpeeds"
      :tsLevels="tsLevels"
      :heroBoots="heroBoots"
      :maps="maps"
    />
    <InsertAttacker
      :unitSpeeds="unitSpeeds"
      :arteSpeeds="arteSpeeds"
      :tsLevels="tsLevels"
      :heroBoots="heroBoots"
      :maps="maps"
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
  },
  data: () => ({
    unitSpeeds: [3, 4, 5, 6, 7, 9, 10, 13, 14, 15, 16, 17, 19, 20, 22, 25],
    arteSpeeds: [0.33, 0.5, 0.67, 1, 1.5, 2],
    tsLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    heroBoots: [0, 25, 50, 75],
    maps: [0, 30, 40, 50]
  })
}
</script>

<style scoped>
.attackers_container {
  padding: 0 10%;
  margin-bottom: 300px;
}
</style>
