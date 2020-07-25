<template>
  <div class="attacker_row">
    <div class="data_item player_name">
      {{ attacker.player }}
    </div>
    <div class="data_item village_name">
      {{ attacker.villageName }}
    </div>
    <div class="data_item coords">
      ({{ attacker.xCoord }}|{{ attacker.yCoord }})
    </div>
    <div class="data_item unit_speed">
      <DropDown
        v-model.number="mutableAttacker.unitSpeed"
        :options="unitSpeeds"
        :initial-value="attacker.unitSpeed"
      />
      sq/h
    </div>
    <div class="data_item arte_speed">
      artefact
      <DropDown
        v-model.number="mutableAttacker.arteSpeed"
        :options="arteSpeeds"
        :initial-value="attacker.arteSpeed"
      />
    </div>
    <div class="data_item tournament_square">
      TS
      <DropDown
        v-model.number="mutableAttacker.tournamentSquare"
        :options="tsLevels"
        :initial-value="attacker.tournamentSquare"
      />
    </div>
    <div class="data_item hero_boots">
      hero boots
      <DropDown
        v-model.number="mutableAttacker.heroBoots"
        :options="heroBoots"
        :initial-value="attacker.heroBoots"
      />
    </div>
    <div class="data_item map">
      map
      <DropDown
        v-model.number="mutableAttacker.map"
        :options="maps"
        :initial-value="attacker.map"
      />
    </div>
    <div
      class="data_item delete_button"
      @click="deleteAttacker"
    >
      Delete
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/common/DropDown'
import AttackerService from '@/services/attacker'
export default {
  name: 'AttackerRow',
  components: {
    DropDown
  },
  props: [
    'attacker',
    'unitSpeeds',
    'arteSpeeds',
    'tsLevels',
    'heroBoots',
    'maps'
  ],
  data: () => ({
    mutableAttacker: {},
    loaded: false
  }),
  watch: {
    mutableAttacker: {
      deep: true,
      handler () {
        if (this.loaded) {
          this.updateAttacker()
        }
      }
    }
  },
  mounted () {
    this.mutableAttacker = {
      ...this.attacker
    }
    this.$nextTick(() => {
      this.loaded = true
    })
  },
  methods: {
    async updateAttacker () {
      await AttackerService.update(this.attacker._id, this.mutableAttacker)
      this.$store.dispatch('getAttackers')
    },
    async deleteAttacker () {
      window.VoerroModal.show({
        title: 'Confirm:',
        body: `Delete (${this.attacker.xCoord}|${this.attacker.yCoord})?`,
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Delete',
            handler: async () => {
              await AttackerService.delete(this.attacker)
              this.$store.dispatch('getAttackers')
            }
          }
        ]
      })
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

.player_name {
  width: 11%;
}

.village_name {
  width: 14%;
  padding-right: 5px;
}

.coords {
  width: 9%;
  text-align: center;
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
