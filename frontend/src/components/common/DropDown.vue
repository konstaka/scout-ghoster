<template>
  <select
    v-model.number="value"
    class="dropdown"
  >
    <option
      v-for="opt of options"
      :key="opt"
    >
      {{ opt }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'DropDown',
  props: [
    'initialValue',
    'options'
  ],
  data: () => ({
    value: 0
  }),
  watch: {
    value (newV) {
      this.$emit('input', newV)
    }
  },
  mounted () {
    this.value = this.initialValue
  }
}
</script>

<style scoped>
.dropdown {
  background: #ebf0f4;
  cursor: pointer;
}
</style>
