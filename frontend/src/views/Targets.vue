<template>
  <div class="targets_wrapper">
    <div
      v-for="target of $store.state.targets"
      :key="`target${target[0].playerName}`"
      class="player left"
    >
      <div class="player_name">
        {{ target[0].playerName }}
      </div>
      <div
        v-for="village of target"
        :key="`target${village.xCoord}${village.yCoord}`"
      >
        <FilterCheckbox :coord-id="village.coordId" />
        <TargetVillage
          :target="village"
          :filtered="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TargetVillage from '@/components/common/TargetVillage'
import FilterCheckbox from '@/components/Targets/FilterCheckbox'
export default {
  name: 'Targets',
  components: {
    TargetVillage,
    FilterCheckbox
  }
}
</script>

<style scoped>
.targets_wrapper {
  width: 100%;
  margin: 0 auto;
}

.player {
  width: 270px;
  display: inline-grid;
}

.target {
  width: 240px;
  float: left;
}

input {
  margin-top: 6px;
  float: left;
}
</style>
