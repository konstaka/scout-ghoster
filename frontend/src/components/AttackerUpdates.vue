<template>
  <div>
    <div>
      <DropDown
        v-model.number="mutableAttacker.unitSpeed"
        :options="$store.state.unitSpeeds"
        :initialValue="attacker.unitSpeed"
      />
      sq/h
    </div>
    <div>
      <DropDown
        v-model.number="mutableAttacker.tournamentSquare"
        :options="$store.state.tsLevels"
        :initialValue="attacker.tournamentSquare"
      />
      TS
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown'
import AttackerService from '@/services/attacker'
export default {
  name: 'AttackerUpdates',
  props: [
    'attacker'
  ],
  components: {
    DropDown
  },
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
      this.$store.dispatch('getInfo')
    }
  }
}
</script>

<style scoped>
</style>
