<template>
  <div class="selections_container">
    <SelectionRow
      v-for="selection of $store.state.selections"
      :key="`${selection.attackerId}${selection.targetId}`"
      :selection="selection"
    />
  </div>
</template>

<script>
import SelectionRow from '@/components/SelectionRow'
export default {
  name: 'Selections',
  components: {
    SelectionRow
  }
}
</script>

<style scoped>
.selections_container {
  padding: 0 10%;
  margin-bottom: 300px;
  overflow-x: scroll;
}
</style>
