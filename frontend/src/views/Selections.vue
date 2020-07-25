<template>
  <div>
    <div
      v-for="selection of $store.state.selections"
      :key="`${selection.attackerId}${selection.targetId}`"
    >
      {{ selection.attackerId }}
      {{ selection.targetId }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Selections'
}
</script>

<style scoped>
</style>
