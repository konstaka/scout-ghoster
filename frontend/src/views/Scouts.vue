<template>
  <div class="scouts_container">
    <ScoutRow
      v-for="scout of $store.state.scouts"
      :key="`scout${scout.x}${scout.y}`"
      :scout="scout"
      :arte-speeds="$store.state.arteSpeeds"
      :ts-levels="$store.state.tsLevels"
      :scout-artes="$store.state.scoutArtes"
    />
    <InsertScout
      :arte-speeds="$store.state.arteSpeeds"
      :ts-levels="$store.state.tsLevels"
      :scout-artes="$store.state.scoutArtes"
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
