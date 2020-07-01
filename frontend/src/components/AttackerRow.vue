<template>
  <div class="attacker_row">
    <div class="data_item player_name">
      {{ attacker.player }}
    </div>
    <div class="data_item village_name">
      {{ attacker.villageName }}
    </div>
    <div class="data_item coords">
      ({{ attacker.x }}|{{ attacker.y }})
    </div>
    <div class="data_item unit_speed">
      <DropDown
        :options="unitSpeeds"
        :initialValue="attacker.unitSpeed"
      />
      sq/h
    </div>
    <div class="data_item arte_speed">
      artefact
      <DropDown
        :options="arteSpeeds"
        :initialValue="attacker.arteSpeed"
      />
    </div>
    <div class="data_item tournament_square">
      TS
      <DropDown
        :options="tsLevels"
        :initialValue="attacker.tournamentSquare"
      />
    </div>
    <div class="data_item hero_boots">
      hero boots
      <DropDown
        :options="heroBoots"
        :initialValue="attacker.heroBoots"
      />
    </div>
    <div class="data_item map">
      map
      <DropDown
        :options="maps"
        :initialValue="attacker.map"
      />
    </div>
    <div class="data_item delete_button" @click="deleteAttacker" >
      Delete
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown'
import AttackerService from '@/services/attacker'
export default {
  name: 'AttackerRow',
  components: {
    DropDown
  },
  props: [
    'attacker'
  ],
  data: () => ({
    unitSpeeds: [3, 4, 5, 6, 7, 9, 10, 13, 14, 15, 16, 17, 19, 20, 22, 25],
    arteSpeeds: [0.33, 0.5, 0.67, 1, 1.5, 2],
    tsLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    heroBoots: [0, 25, 50, 75],
    maps: [0, 30, 40, 50]
  }),
  methods: {
    async deleteAttacker () {
      if (window.confirm(`Delete (${this.attacker.x}|${this.attacker.y})?`)) {
        await AttackerService.delete(this.attacker)
        this.$store.dispatch('getInfo')
      }
    }
  }
}
</script>

<style scoped>
.attacker_row {
  width: 80%;
  margin: 18px auto;
}

.data_item {
  width: 7%;
  max-height: 22px;
  display: inline-block;
  overflow: hidden;
  text-align: left;
}

.player_name {
  width: 11%;
}

.village_name {
  width: 11%;
  padding-right: 5px;
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

.delete_button {
  width: 5%;
  height: 17px;
  margin: 1px 20px;
  font-size: 0.9em;
  text-align: center;
  border: 1px solid #666666;
  background: #f4ebf0;
  cursor: pointer;
}
</style>
