<template>
  <div class="scouts_container">
    <ScoutRow
      v-for="scout of $store.state.scouts"
      :key="`scout${scout.x}${scout.y}`"
      :scout="scout"
      :arteSpeeds="$store.state.arteSpeeds"
      :tsLevels="$store.state.tsLevels"
      :scoutArtes="$store.state.scoutArtes"
    />
    <InsertScout
      :arteSpeeds="$store.state.arteSpeeds"
      :tsLevels="$store.state.tsLevels"
      :scoutArtes="$store.state.scoutArtes"
    />
  </div>
</template>

<script>
import ScoutRow from '@/components/ScoutRow'
import InsertScout from '@/components/InsertScout'
export default {
  name: 'Scouts',
  components: {
    ScoutRow,
    InsertScout
  }
}
</script>

<style scoped>
.scouts_container {
  padding: 0 10%;
  margin-bottom: 300px;
}
</style>
