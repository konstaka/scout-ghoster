<template>
  <div class="attacker_row">
    <div class="data_item explain_text">
      Add new scout:
    </div>
    <div class="data_item inputs">
      x
      <input
        v-model.number="xCoord"
        type="number"
        class="coord_box"
      >
      y
      <input
        v-model.number="yCoord"
        type="number"
        class="coord_box"
      >
    </div>
    <div class="data_item arte_speed">
      artefact
      <DropDown
        v-model.number="arteSpeed"
        :options="arteSpeeds"
        :initialValue="arteSpeed"
      />
    </div>
    <div class="data_item tournament_square">
      TS
      <DropDown
        v-model.number="tsLevel"
        :options="tsLevels"
        :initialValue="tsLevel"
      />
    </div>
    <div class="data_item scout_amount">
      <DropDown
        v-model.number="scoutArte"
        :options="scoutArtes"
        :initialValue="scoutArte"
      />
      x
      <input
        v-model.number="scoutAmount"
        type="number"
        class="amount_box"
      >
      scouts
    </div>
    <div
      class="data_item add_button"
      @click="addScout"
    >
      Add
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown'
import ScoutService from '@/services/scout'
export default {
  name: 'InsertScout',
  components: {
    DropDown
  },
  props: [
    'arteSpeeds',
    'tsLevels',
    'scoutArtes'
  ],
  data: () => ({
    xCoord: null,
    yCoord: null,
    arteSpeed: 1,
    tsLevel: 0,
    scoutAmount: null,
    scoutArte: 1
  }),
  methods: {
    async addScout () {
      await ScoutService.save({
        x: this.xCoord,
        y: this.yCoord,
        arteSpeed: this.arteSpeed,
        tournamentSquare: this.tsLevel,
        scoutAmount: this.scoutAmount,
        scoutArte: this.scoutArte
      })
      this.$store.dispatch('getInfo')
    }
  }
}
</script>

<style scoped>
.attacker_row {
  width: 100%;
  margin: 18px auto;
}

.data_item {
  width: 7%;
  max-height: 22px;
  display: inline-block;
  overflow: hidden;
  text-align: left;
}

.explain_text {
  width: 24%;
  text-align: left;
}

.inputs {
  width: 18%;
  text-align: center;
  padding-right: 5px;
}

.coord_box {
  width: 42px;
  margin-right: 15px;
}

input {
  background: #ebf0f4;
}

.unit_speed {
  width: 8%;
}

.arte_speed {
  width: 11%;
}

.hero_boots {
  width: 12%;
}

.scout_amount {
  width: 21%;
}

.amount_box {
  width: 100px;
}

.add_button {
  width: 5%;
  height: 17px;
  margin: 1px 20px;
  font-size: 0.9em;
  text-align: center;
  border: 1px solid #666666;
  background: #f0f4eb;
  cursor: pointer;
}
</style>
