<template>
  <div class="home-wrapper">
    <div class="targets">
      <!-- Ops hitting time -->
      <div class="hitting_time">
        Ops hits at:
        <VueTimepicker
          v-model="opsHittingTime"
          format="HH:mm:ss"
          class="timepicker"
        />
      </div>
      <!-- Targets -->
      <TargetVillage
        v-for="village of $store.state.targets"
        :key="`${village.x}${village.y}`"
        :player="village.player"
        :village-name="village.villageName"
        :x="village.x"
        :y="village.y"
        class="left"
      />
    </div>
    <!-- Attackers and times -->
    <div class="attacker_cols">
      <AttackerCol
        v-for="village of $store.state.attackers"
        :key="`${village.x}${village.y}`"
        :player="village.player"
        :village-name="village.villageName"
        :x="village.x"
        :y="village.y"
        class="attacker"
      />
    </div>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import { mapFields } from 'vuex-map-fields'
import TargetVillage from '@/components/TargetVillage'
import AttackerCol from '@/components/AttackerCol'
export default {
  name: 'Home',
  components: {
    VueTimepicker,
    TargetVillage,
    AttackerCol
  },
  computed: {
    ...mapFields([
      'opsHittingTime'
    ])
  }
}
</script>

<style scoped>
.home-wrapper {
  padding-top: 5px;
}

.left {
  text-align: left;
}

.targets {
  width: 200px;
  float: left;
}

.hitting_time {
  height: 100px;
}

.attacker_cols {
  float: left;
}

.attacker {
  width: 200px;
  float: left;
}
</style>
