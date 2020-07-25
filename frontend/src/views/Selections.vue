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
  margin-bottom: 300px;
}

@media screen and (max-width: 1330px) {
  .selections_container {
    overflow-x: scroll;
  }
}
</style>
