<template>
  <div class="target">
    {{ target.villageName }} ({{ target.xCoord }}|{{ target.yCoord }})
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
  max-height: 22px;
}
</style>
