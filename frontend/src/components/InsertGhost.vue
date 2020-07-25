<template>
  <div class="attacker_row">
    <div class="data_item explain_text">
      Add new ghost:
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
        :initial-value="unitSpeed"
      />
      sq/h
    </div>
    <div class="data_item arte_speed">
      artefact
      <DropDown
        v-model.number="arteSpeed"
        :options="arteSpeeds"
        :initial-value="arteSpeed"
      />
    </div>
    <div class="data_item tournament_square">
      TS
      <DropDown
        v-model.number="tsLevel"
        :options="tsLevels"
        :initial-value="tsLevel"
      />
    </div>
    <div class="data_item hero_boots">
      hero boots
      <DropDown
        v-model.number="hero"
        :options="heroBoots"
        :initial-value="hero"
      />
    </div>
    <div class="data_item ghost_amount">
      <input
        v-model.number="ghostAmount"
        type="number"
        class="amount_box"
      >
      units
    </div>
    <div
      class="data_item add_button"
      @click="addGhost"
    >
      Add
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown'
import GhostService from '@/services/ghost'
export default {
  name: 'InsertGhost',
  components: {
    DropDown
  },
  props: [
    'unitSpeeds',
    'arteSpeeds',
    'tsLevels',
    'heroBoots'
  ],
  data: () => ({
    xCoord: null,
    yCoord: null,
    unitSpeed: 3,
    arteSpeed: 1,
    tsLevel: 0,
    hero: 0,
    ghostAmount: null
  }),
  methods: {
    async addGhost () {
      await GhostService.save({
        xCoord: this.xCoord,
        yCoord: this.yCoord,
        unitSpeed: this.unitSpeed,
        arteSpeed: this.arteSpeed,
        tournamentSquare: this.tsLevel,
        heroBoots: this.hero,
        ghostAmount: this.ghostAmount
      })
      this.$store.dispatch('getGhosts')
    }
  }
}
</script>

<style scoped>
.attacker_row {
  width: 100%;
  min-width: 1330px;
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
  width: 18%;
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

.ghost_amount {
  width: 18%;
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
