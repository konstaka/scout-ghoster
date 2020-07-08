<template>
  <input
    v-model="isVisible"
    type="checkbox"
  />
</template>

<script>
import TargetService from '@/services/target'
export default {
  name: 'FilterCheckbox',
  props: [
    'coordId'
  ],
  data: () => ({
    isVisible: false,
    loaded: false
  }),
  watch: {
    async isVisible (newV, oldV) {
      if (this.loaded) {
        await TargetService.updateFilter(this.coordId, newV)
        this.$store.dispatch('getInfo')
      }
    }
  },
  mounted () {
    this.isVisible = this.$store.state.filter[this.coordId]
    this.$nextTick(() => {
      this.loaded = true
    })
  }
}
</script>

<style scoped>
</style>
