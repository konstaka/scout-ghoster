<template>
  <div class="commands_container">
    <CommandRow
      v-for="command of $store.state.ghostCommands"
      :key="command._id"
      :command="command"
      :is-ghost="true"
    />
  </div>
</template>

<script>
import CommandRow from '@/components/common/CommandRow'
export default {
  name: 'GhostCommands',
  components: {
    CommandRow
  }
}
</script>

<style scoped>
.commands_container {
  margin-bottom: 300px;
}

@media screen and (max-width: 1330px) {
  .commands_container {
    overflow-x: scroll;
  }
}
</style>
