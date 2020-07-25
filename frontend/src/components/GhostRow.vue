<template>
  <div class="attacker_row">
    <div class="data_item player_name">
      {{ ghost.player }}
    </div>
    <div class="data_item village_name">
      {{ ghost.villageName }}
    </div>
    <div class="data_item coords">
      ({{ ghost.xCoord }}|{{ ghost.yCoord }})
    </div>
    <div class="data_item unit_speed">
      <DropDown
        v-model.number="mutableGhost.unitSpeed"
        :options="unitSpeeds"
        :initial-value="ghost.unitSpeed"
      />
      sq/h
    </div>
    <div class="data_item arte_speed">
      artefact
      <DropDown
        v-model.number="mutableGhost.arteSpeed"
        :options="arteSpeeds"
        :initial-value="ghost.arteSpeed"
      />
    </div>
    <div class="data_item tournament_square">
      TS
      <DropDown
        v-model.number="mutableGhost.tournamentSquare"
        :options="tsLevels"
        :initial-value="ghost.tournamentSquare"
      />
    </div>
    <div class="data_item hero_boots">
      hero boots
      <DropDown
        v-model.number="mutableGhost.heroBoots"
        :options="heroBoots"
        :initial-value="ghost.heroBoots"
      />
    </div>
    <div class="data_item ghost_amount">
      <input
        v-model.number="mutableGhost.ghostAmount"
        type="number"
        class="amount_box"
      >
      units ({{ ghost.unitName }})
    </div>
    <div
      class="data_item delete_button"
      @click="deleteGhost"
    >
      Delete
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown'
import GhostService from '@/services/ghost'
export default {
  name: 'AttackerRow',
  components: {
    DropDown
  },
  props: [
    'ghost',
    'unitSpeeds',
    'arteSpeeds',
    'tsLevels',
    'heroBoots'
  ],
  data: () => ({
    mutableGhost: {},
    loaded: false
  }),
  watch: {
    mutableGhost: {
      deep: true,
      handler () {
        if (this.loaded) {
          this.updateGhost()
        }
      }
    }
  },
  mounted () {
    this.mutableGhost = {
      ...this.ghost
    }
    this.$nextTick(() => {
      this.loaded = true
    })
  },
  methods: {
    async updateGhost () {
      await GhostService.update(this.ghost._id, this.mutableGhost)
      this.$store.dispatch('getGhosts')
    },
    async deleteGhost () {
      window.VoerroModal.show({
        title: 'Confirm:',
        body: `Delete (${this.ghost.xCoord}|${this.ghost.yCoord})?`,
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Delete',
            handler: async () => {
              await GhostService.delete(this.ghost)
              this.$store.dispatch('getGhosts')
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

.ghost_amount {
  width: 18%;
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
