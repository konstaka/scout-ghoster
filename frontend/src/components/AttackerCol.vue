<template>
  <div class="attacker">
    {{ villageName }} ({{ x }}|{{ y }})
  </div>
</template>

<script>
export default {
  name: 'AttackerCol',
  props: [
    'player',
    'villageName',
    'x',
    'y'
  ]
}
</script>

<style scoped>
.attacker {
  height: 100px;
}
</style>
