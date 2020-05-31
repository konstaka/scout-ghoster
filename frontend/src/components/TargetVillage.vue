<template>
  <div class="target">
    {{ target.villageName }} ({{ target.x }}|{{ target.y }})
  </div>
</template>

<script>
export default {
  name: 'TargetVillage',
  props: [
    'target'
  ]
}
</script>

<style scoped>
.target {
  border: 1px solid #d2d2d2;
  padding-left: 5px;
}
</style>
