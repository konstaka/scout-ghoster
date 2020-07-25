<template>
  <div class="scouts_container">
    <ScoutRow
      v-for="scout of $store.state.scouts"
      :key="`scout${scout.xCoord}${scout.yCoord}`"
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
import ScoutRow from '@/components/Scouts/ScoutRow'
import InsertScout from '@/components/Scouts/InsertScout'
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
  margin-bottom: 300px;
}

@media screen and (max-width: 1330px) {
  .scouts_container {
    overflow-x: scroll;
  }
}
</style>
