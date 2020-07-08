<template>
  <div class="home_wrapper">
    <div class="sticky">
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
      <!-- Attackers -->
      <div name="scrollingAttackers" class="attacker_cols names syncscroll">
        <div
          v-for="attacker of $store.state.attackers"
          :key="`attackerName${attacker.x}${attacker.y}`"
          class="attacker_col"
        >
          <div class="attacker">
            {{ attacker.villageName }} ({{ attacker.x }}|{{ attacker.y }})
          </div>
          <AttackerUpdates
            :attacker="attacker"
          />
        </div>
      </div>
    </div>
    <div class="targets_wrapper">
      <!-- Targets -->
      <div
        v-for="target of $store.state.targets"
        :key="`target${target[0].playerName}`"
        class="player left"
      >
        <div class="player_name">
          {{ target[0].playerName }}
        </div>
        <TargetVillage
          v-for="village of target"
          :key="`target${village.xCoord}${village.yCoord}`"
          :target="village"
        />
      </div>
    </div>
    <!-- Sending times -->
    <div name="scrollingAttackers" class="attacker_cols syncscroll">
      <AttackerCol
        v-for="attacker of $store.state.attackers"
        :key="`attacker${attacker.x}${attacker.y}`"
        :attacker="attacker"
        class="attacker_col"
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
import AttackerUpdates from '@/components/AttackerUpdates'
import syncscroll from '@/util/syncscroll-0.0.3/syncscroll'
export default {
  name: 'Home',
  components: {
    Datepicker,
    VueTimepicker,
    TargetVillage,
    AttackerCol,
    AttackerUpdates
  },
  computed: {
    ...mapFields([
      'opsHittingDay',
      'opsHittingTime'
    ])
  },
  mounted () {
    if (syncscroll) {
      syncscroll.reset()
    }
  }
}
</script>

<style>
.home_wrapper {
  padding-top: 5px;
}

.timepicker {
  margin-top: 6px;
}

.timepicker input, .datepicker input {
  background: #ebf0f4;
  border: 1px solid #666 !important;
  width: 160px;
}

.sticky {
  height: 100px;
  position: sticky;
  top: 0;
  background: #dbe3eb;
  -webkit-box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2);
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2);
}

.targets_wrapper {
  width: 250px;
  float: left;
}

.player {
  margin-top: 20px;
}

.player_name {
  margin-left: 10px;
  font-style: italic;
}

.left {
  text-align: left;
}

.hitting_time {
  width: 245px;
  height: 100px;
  padding-left: 5px;
  float: left;
}

.attacker_cols {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  text-align: left;
}

.names {
  height: 100px;
}

.attacker {
  margin: 8px 0;
}

.attacker_col {
  width: 245px;
  display: inline-block;
}
</style>
