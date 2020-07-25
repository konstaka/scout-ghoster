<template>
  <div class="ghosts_container">
    <GhostRow
      v-for="ghost of $store.state.ghosts"
      :key="`ghost${ghost.xCoord}${ghost.yCoord}`"
      :ghost="ghost"
      :unit-speeds="$store.state.unitSpeeds"
      :arte-speeds="$store.state.arteSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
    />
    <InsertGhost
      :unit-speeds="$store.state.unitSpeeds"
      :arte-speeds="$store.state.arteSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
    />
  </div>
</template>

<script>
import GhostRow from '@/components/GhostRow'
import InsertGhost from '@/components/InsertGhost'
export default {
  name: 'Ghosts',
  components: {
    GhostRow,
    InsertGhost
  }
}
</script>

<style scoped>
.ghosts_container {
  margin-bottom: 300px;
}

@media screen and (max-width: 1330px) {
  .ghosts_container {
    overflow-x: scroll;
  }
}
</style>
