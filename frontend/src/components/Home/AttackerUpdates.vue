<template>
  <div>
    <div>
      <DropDown
        v-model.number="mutableAttacker.unitSpeed"
        :options="$store.state.unitSpeeds"
        :initial-value="attacker.unitSpeed"
      />
      sq/h
    </div>
    <div>
      <DropDown
        v-model.number="mutableAttacker.tournamentSquare"
        :options="$store.state.tsLevels"
        :initial-value="attacker.tournamentSquare"
      />
      TS
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/common/DropDown'
import AttackerService from '@/services/attacker'
export default {
  name: 'AttackerUpdates',
  components: {
    DropDown
  },
  props: [
    'attacker'
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
    }
  }
}
</script>

<style scoped>
</style>
