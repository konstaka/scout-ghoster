<template>
  <select
    v-model="value"
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
  mounted () {
    this.value = this.initialValue
  }
}
</script>

<style scoped>
.dropdown {
  margin-left: 2px;
  background: #ebf0f4;
  cursor: pointer;
}
</style>
