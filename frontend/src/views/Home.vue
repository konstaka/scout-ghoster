<template>
  <div class="home-wrapper">
    <div class="targets">
      <!-- Ops hitting time -->
      <div class="hitting_time left">
        Ops hits at:
        <VueTimepicker
          v-model="opsHittingTime"
          format="HH:mm:ss"
          class="timepicker"
        />
        <Datepicker
          v-model="opsHittingDay"
          monday-first
          class="datepicker"
        />
      </div>
      <!-- Targets -->
      <TargetVillage
        v-for="target of $store.state.targets"
        :key="`target${target.x}${target.y}`"
        :target="target"
        class="left"
      />
    </div>
    <!-- Attackers and times -->
    <div class="attacker_cols">
      <AttackerCol
        v-for="attacker of $store.state.attackers"
        :key="`attacker${attacker.x}${attacker.y}`"
        :attacker="attacker"
        class="attacker"
      />
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import { mapFields } from 'vuex-map-fields'
import TargetVillage from '@/components/TargetVillage'
import AttackerCol from '@/components/AttackerCol'
export default {
  name: 'Home',
  components: {
    Datepicker,
    VueTimepicker,
    TargetVillage,
    AttackerCol
  },
  computed: {
    ...mapFields([
      'opsHittingDay',
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
  padding-left: 5px;
}

.attacker_cols {
  float: left;
}

.attacker {
  width: 200px;
  float: left;
}
</style>
