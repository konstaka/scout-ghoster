<template>
  <div class="target">
    {{ villageName }} ({{ x }}|{{ y }})
  </div>
</template>

<script>
export default {
  name: 'TargetVillage',
  props: [
    'player',
    'villageName',
    'x',
    'y'
  ]
}
</script>

<style scoped>
.target {
  border: 1px solid #d2d2d2;
  padding-left: 5px;
}
</style>
