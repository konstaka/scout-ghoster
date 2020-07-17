<template>
  <div class="attacker_row">
    <div class="data_item player_name">
      {{ scout.player }}
    </div>
    <div class="data_item village_name">
      {{ scout.villageName }}
    </div>
    <div class="data_item coords">
      ({{ scout.x }}|{{ scout.y }})
    </div>
    <div class="data_item unit_speed">
      {{ scout.unitSpeed }} sq/h
    </div>
    <div class="data_item arte_speed">
      artefact
      <DropDown
        v-model.number="mutableScout.arteSpeed"
        :options="arteSpeeds"
        :initialValue="scout.arteSpeed"
      />
    </div>
    <div class="data_item tournament_square">
      TS
      <DropDown
        v-model.number="mutableScout.tournamentSquare"
        :options="tsLevels"
        :initialValue="scout.tournamentSquare"
      />
    </div>
    <div class="data_item scout_amount">
      <DropDown
        v-model.number="mutableScout.scoutArte"
        :options="scoutArtes"
        :initialValue="scout.scoutArte"
      />
      x
      <input
        v-model.number="mutableScout.scoutAmount"
        type="number"
        class="amount_box"
      >
      scouts
    </div>
    <div
      class="data_item delete_button"
      @click="deleteScout"
    >
      Delete
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown'
import ScoutService from '@/services/scout'
export default {
  name: 'ScoutRow',
  components: {
    DropDown
  },
  props: [
    'scout',
    'unitSpeeds',
    'arteSpeeds',
    'tsLevels',
    'heroBoots',
    'scoutArtes'
  ],
  data: () => ({
    mutableScout: {},
    loaded: false
  }),
  watch: {
    mutableScout: {
      deep: true,
      handler () {
        if (this.loaded) {
          this.updateScout()
        }
      }
    }
  },
  mounted () {
    this.mutableScout = {
      ...this.scout
    }
    this.$nextTick(() => {
      this.loaded = true
    })
  },
  methods: {
    async updateScout () {
      await ScoutService.update(this.scout._id, this.mutableScout)
      this.$store.dispatch('getInfo')
    },
    async deleteScout () {
      window.VoerroModal.show({
        title: 'Confirm:',
        body: `Delete (${this.scout.x}|${this.scout.y})?`,
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Delete',
            handler: async () => {
              await ScoutService.delete(this.scout)
              this.$store.dispatch('getInfo')
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

.scout_amount {
  width: 21%;
}

.amount_box {
  width: 100px;
}

input {
  background: #ebf0f4;
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
