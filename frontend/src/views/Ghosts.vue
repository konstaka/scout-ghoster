<template>
  <div class="ghosts_container">
    <GhostRow
      v-for="ghost of $store.state.ghosts"
      :key="`ghost${ghost.x}${ghost.y}`"
      :ghost="ghost"
      :unitSpeeds="$store.state.unitSpeeds"
      :arteSpeeds="$store.state.arteSpeeds"
      :tsLevels="$store.state.tsLevels"
      :heroBoots="$store.state.heroBoots"
    />
    <InsertGhost
      :unitSpeeds="$store.state.unitSpeeds"
      :arteSpeeds="$store.state.arteSpeeds"
      :tsLevels="$store.state.tsLevels"
      :heroBoots="$store.state.heroBoots"
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
  padding: 0 10%;
  margin-bottom: 300px;
}
</style>
