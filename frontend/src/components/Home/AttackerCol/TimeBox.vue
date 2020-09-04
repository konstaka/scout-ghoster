<template>
  <div
    v-if="!filtered || isVisible"
    class="timebox"
  >
    <div
      class="times"
      :class="{ pressed: isSelected }"
      @click="toggleSelected"
    >
      {{ sendingTime }} -> {{ landingTime }}
    </div>
    <div class="buttons">
      <div
        class="button"
        @click="changeFlex(-1)"
      >
        -
      </div>
      <div
        class="button"
        @click="changeFlex(1)"
      >
        +
      </div>
    </div>
  </div>
</template>

<script>
import { getSendingTime, getLandingTime } from '@/util/travelTime'
import SelectionsService from '@/services/selections'
import FlexSecondsService from '@/services/flexSeconds'
export default {
  name: 'TimeBox',
  props: [
    'target',
    'attacker',
    'filtered'
  ],
  data: () => ({
    buttonMultiplier: 1,
    timeout: null
  }),
  computed: {
    sendingTime () {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      return getSendingTime(this.target, this.attacker)
        .toLocaleTimeString('en-GB', options)
    },
    landingTime () {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      return getLandingTime(this.target, this.attacker)
        .toLocaleTimeString('en-GB', options)
    },
    isVisible () {
      return this.$store.state.filter[this.target.coordId]
    },
    isSelected () {
      return this.$store.state.selections.some(
        (selection) => {
          return selection.targetId === this.target._id
            && selection.attackerId === this.attacker._id
        }
      )
    }
  },
  methods: {
    selectionId () {
      for (const selection of this.$store.state.selections) {
        if (selection.targetId === this.target._id
          && selection.attackerId === this.attacker._id) {
          return selection._id
        }
      }
      return null
    },
    async toggleSelected () {
      const selectionId = this.selectionId()
      this.$store.commit('UPDATE_SELECTION', {
        target: {
          _id: this.target._id,
          xCoord: this.target.xCoord,
          yCoord: this.target.yCoord
        },
        attacker: {
          _id: this.attacker._id,
          xCoord: this.attacker.xCoord,
          yCoord: this.attacker.yCoord
        },
        scout: undefined,
        ghost: undefined,
        updated: false,
        selected: !this.isSelected
      })
      if (this.isSelected) {
        await SelectionsService.post({
          targetId: this.target._id,
          attackerId: this.attacker._id
        })
      } else {
        await SelectionsService.delete(selectionId)
      }
      this.$store.dispatch('updateCycle')
    },
    changeFlex (amount) {
      this.$store.commit('CHANGE_FLEX', {
        target: this.target,
        attacker: this.attacker,
        amount: this.buttonMultiplier * amount
      })
      this.buttonMultiplier = 10
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        this.buttonMultiplier = 1
        await FlexSecondsService.put(this.$store.state.flexSeconds)
        this.$store.dispatch('updateCycle')
      }, 200)
    }
  }
}
</script>

<style scoped>
.timebox {
  max-height: 24px;
  overflow: hidden;
}

.times {
  display: inline-block;
  width: fit-content;
  padding: 0 5px;
  border: 1px solid #d2d2d2;
  cursor: pointer;
}

.pressed {
  border-style: inset;
  background-color: #f4f4f4;
}

.buttons {
  display: inline-block;
}

.button {
  display: inline-block;
  width: 24px;
  max-height: 24px;
  border: 1px solid #d2d2d2;
  text-align: center;
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.button:active {
  border-style: inset;
  background-color: #f4f4f4;
}
</style>
