<template>
  <div class="command_row">
    <div class="data_item player_name">
      <a
        :href="`https://${
          $store.state.serverConfig.url
        }/position_details.php?x=${
          command.attacker.xCoord
        }&y=${
          command.attacker.yCoord
        }`"
        target="_blank"
      >
        {{ command.attacker.villageName }} ({{ command.attacker.xCoord }}|{{ command.attacker.yCoord }})
      </a>
    </div>
    <div
      v-if="isScout"
      class="data_item sending_time"
    >
      sends at {{ sendingTime }} to
    </div>
    <div
      v-if="isScout"
      class="data_item player_name"
    >
      {{ command.target.villageName }} ({{ command.target.xCoord }}|{{ command.target.yCoord }}):
    </div>
    <div
      v-if="isScout"
      class="data_item scout_send"
    >
      send scout at {{ scoutSendingTime }} from
    </div>
    <div
      v-if="isScout"
      class="data_item player_name"
    >
      {{ command.scout.villageName }} ({{ command.scout.xCoord }}|{{ command.scout.yCoord }})
    </div>
    <div
      v-if="isGhost"
      class="data_item return_time"
    >
      is back home at {{ returnTime }}:
    </div>
    <div
      v-if="isGhost"
      class="data_item ghost_send"
    >
      send ghost at {{ ghostSendingTime }} from
    </div>
    <div
      v-if="isGhost"
      class="data_item player_name"
    >
      {{ command.ghost.villageName }} ({{ command.ghost.xCoord }}|{{ command.ghost.yCoord }})
    </div>
  </div>
</template>

<script>
import {
  getSendingTime,
  getScoutSend,
  getReturnTime,
  getGhostSend
} from '@/util/travelTime'
export default {
  name: 'CommandRow',
  props: [
    'command',
    'isScout',
    'isGhost'
  ],
  data: () => ({
    options: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  }),
  computed: {
    sendingTime () {
      return getSendingTime(this.command.target, this.command.attacker)
        .toLocaleTimeString('en-GB', this.options)
    },
    scoutSendingTime () {
      return getScoutSend(this.command.target, this.command.attacker, this.command.scout)
        .toLocaleTimeString('en-GB', this.options)
    },
    returnTime () {
      return getReturnTime(this.command.target, this.command.attacker)
        .toLocaleTimeString('en-GB', this.options)
    },
    ghostSendingTime () {
      return getGhostSend(this.command.target, this.command.attacker, this.command.ghost)
        .toLocaleTimeString('en-GB', this.options)
    }
  }
}
</script>

<style scoped>
.command_row {
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
  margin-right: 5px;
  width: 220px;
  font-style: italic;
}

.player_name a {
  color: #2c3e50;
}

.sending_time {
  width: auto;
  margin-right: 10px;
}

.scout_send {
  width: 215px;
}

.return_time {
  width: 185px;
}

.ghost_send {
  width: 215px;
  margin-left: 30px;
}
</style>
