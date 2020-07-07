<template>
  <div class="attacker_row">
    <div class="data_item explain_text">
      Add new attacker:
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
    <div class="data_item unit_speed">
      <DropDown
        v-model.number="unitSpeed"
        :options="unitSpeeds"
        :initialValue="unitSpeed"
      />
      sq/h
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
    <div class="data_item hero_boots">
      hero boots
      <DropDown
        v-model.number="hero"
        :options="heroBoots"
        :initialValue="hero"
      />
    </div>
    <div class="data_item map">
      map
      <DropDown
        v-model.number="map"
        :options="maps"
        :initialValue="map"
      />
    </div>
    <div
      class="data_item add_button"
      @click="addAttacker"
    >
      Add
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown'
import AttackerService from '@/services/attacker'
export default {
  name: 'InsertAttacker',
  components: {
    DropDown
  },
  props: [
    'unitSpeeds',
    'arteSpeeds',
    'tsLevels',
    'heroBoots',
    'maps'
  ],
  data: () => ({
    xCoord: null,
    yCoord: null,
    unitSpeed: 3,
    arteSpeed: 1,
    tsLevel: 0,
    hero: 0,
    map: 0
  }),
  methods: {
    async addAttacker () {
      await AttackerService.save({
        x: this.xCoord,
        y: this.yCoord,
        unitSpeed: this.unitSpeed,
        arteSpeed: this.arteSpeed,
        tournamentSquare: this.tsLevel,
        heroBoots: this.hero,
        map: this.map
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
  width: 15%;
  text-align: left;
}

.inputs {
  width: 16%;
  text-align: right;
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
