<template>
  <div class="container">
    <div>
      <textarea
        v-model="source"
        class="textbox"
        placeholder="Rally point source code"
      />
    </div>
    <button @click="parseIncomings">
      Parse
    </button>
    <div class="parsed_rows">
      <div
        v-for="row of rows"
        :key="row[0]+row[1]+row[3]+row[4]+row[7]+row[8]"
      >
        {{ row.join(", ") }}
        <input
          v-model="comments[row[0]+row[1]+row[3]+row[4]+row[7]+row[8]]"
          class="commentbox"
          placeholder="TS level, other comments"
        >
      </div>
    </div>
    <button
      v-if="rows.length > 0"
      @click="send"
    >
      Send
    </button>
    <div>
      <textarea
        v-if="result.length > 0"
        v-model="result"
        class="textbox"
      />
    </div>
  </div>
</template>

<script>
import DOMParser from 'dom-parser'
import { mapIdtoCoordinates } from '@/util/mapId'
export default {
  name: 'Incomings',
  data: () => ({
    source: '',
    rows: [],
    comments: {},
    result: ''
  }),
  methods: {
    dateWhenLapsed (hours) {
      try {
        const time = hours.split(':')
        let now = new Date().getTime()
        now += time[0] * 60 * 60 * 1000
        now += time[1] * 60 * 1000
        now += time[2] * 1000
        return new Date(now)
      } catch (e) {
        console.log(e)
        return null
      }
    },
    parseIncoming (node, playerName) {
      const incomingRow = []
      try {
        incomingRow.push(
          node.childNodes[7].childNodes[1].childNodes[3].childNodes[3].childNodes[0]
            .innerHTML.split('&nbsp;')[1]
        )

        const date = this.dateWhenLapsed(
          node.childNodes[7].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerHTML
        )
        incomingRow.push(`${date.getUTCDate()}.${date.getUTCMonth() + 1}`)

        incomingRow.push(playerName)

        const targetCoordId = node.childNodes[1].childNodes[1].childNodes[3].childNodes[3]
          .attributes[0].value.split('?d=')[1]
        const { x: targetX, y: targetY } = mapIdtoCoordinates(
          parseInt(targetCoordId),
          parseInt(process.env.SERVER_SIZE || 801)
        )
        incomingRow.push(targetX)
        incomingRow.push(targetY)

        const attackerName = node.childNodes[1].childNodes[1].childNodes[3].childNodes[3]
          .innerHTML.split(' ')[0]
        incomingRow.push(attackerName)
        incomingRow.push(' ')

        const attackerCoordId = node.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
          .attributes[0].value.split('?d=')[1]
        const { x: attackerX, y: attackerY } = mapIdtoCoordinates(
          parseInt(attackerCoordId),
          parseInt(process.env.SERVER_SIZE || 801)
        )
        incomingRow.push(attackerX)
        incomingRow.push(attackerY)

        incomingRow.push(new Date().toISOString().split('T')[1].substring(0, 8))

        incomingRow.push(' ')
        incomingRow.push(' ')
        incomingRow.push(' ')
      } catch (e) {
        console.log(e)
      }
      return incomingRow
    },
    parseIncomings () {
      this.result = ''

      const parser = new DOMParser()
      const dom = parser.parseFromString(this.source)

      const playerName = dom.getElementsByClassName('playerName')[0].innerHTML
      console.log(playerName)

      const incomingAttacks = dom.getElementsByClassName('inAttack')
      const incomingRaids = dom.getElementsByClassName('inRaid')
      const incomings = [...incomingAttacks, ...incomingRaids]
      console.log(incomings)

      const rows = []
      for (const attack of incomings) {
        rows.push(this.parseIncoming(attack, playerName))
      }

      const uniqueRows = {}
      this.rows = rows.filter((row) => {
        if (!uniqueRows[row[0] + row[1] + row[3] + row[4] + row[7] + row[8]]) {
          uniqueRows[row[0] + row[1] + row[3] + row[4] + row[7] + row[8]] = 1
          return true
        }
        uniqueRows[row[0] + row[1] + row[3] + row[4] + row[7] + row[8]]++
        return false
      })

      for (const row of this.rows) {
        row.push(`${uniqueRows[row[0] + row[1] + row[3] + row[4] + row[7] + row[8]]} waves`)
      }

      console.log(this.rows)
    },
    send () {
      if (this.result) this.result = ''
      for (const row of this.rows) {
        row.push(this.comments[row[0] + row[1] + row[3] + row[4] + row[7] + row[8]])
        this.result += row.join(',')
        this.result += '\n'
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin-bottom: 300px;
}

.textbox {
  margin-top: 20px;
  width: 97%;
  height: 100px;
}

.commentbox {
  width: 200px;
}

.parsed_rows {
  margin-top: 20px;
}
</style>
