<template>
  <div class="timebox">
    00:00:00
  </div>
</template>

<script>
export default {
  name: 'TimeBox',
  props: [
    'target',
    'attacker'
  ]
}
</script>

<style scoped>
.timebox {
  border: 1px solid #d2d2d2;
}
</style>
