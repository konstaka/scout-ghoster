import store from '@/store/index'

/**
 * Calculates travel time in seconds on a Travian T4 (2019) map
 */
export const getTravelTime = (target, attacker, map) => {
  // Distance on a torus surface
  let distance = Math.sqrt(
    Math.pow(
      Math.min(
        Math.abs(attacker.xCoord - target.xCoord),
        store.state.serverConfig.size * 2 + 1 - Math.abs(attacker.xCoord - target.xCoord)),
      2)
    + Math.pow(
      Math.min(
        Math.abs(attacker.yCoord - target.yCoord),
        store.state.serverConfig.size * 2 + 1 - Math.abs(attacker.yCoord - target.yCoord)),
      2)
  )
  // Round as per Travian implementation
  distance = Math.round(distance * Math.pow(10, 5)) / Math.pow(10, 5)
  // Baseline speed
  let squaresPerSecond = attacker.unitSpeed
    * store.state.serverConfig.speed
    * attacker.arteSpeed
    / 60
    / 60
  // Return if distance under 20
  if (distance <= 20) {
    const time = distance / squaresPerSecond
    return Math.round(map ? time * 100 / (100 + map) : time)
  }
  // No-TS part of travel
  let travelTime = 20 / squaresPerSecond
  // Reduce distance
  distance -= 20
  // Calculate TS and boots factor
  let factor = 1.0 + attacker.tournamentSquare * 0.2
  factor += (attacker.heroBoots || 0) / 100
  // Adjust speed
  squaresPerSecond *= factor
  // Compute remaining time
  travelTime += distance / squaresPerSecond
  return Math.round(map ? travelTime * 100 / (100 + map) : travelTime)
}

export const getLandingTime = (target, attacker) => {
  const time = new Date(store.state.opsHittingDay)
  time.setHours(store.state.opsHittingTime.HH)
  time.setMinutes(store.state.opsHittingTime.mm)
  time.setSeconds(store.state.opsHittingTime.ss)
  time.setMilliseconds(0)
  if (target && attacker) {
    time.setSeconds(
      time.getSeconds() + (store.state.flexSeconds[target._id][attacker._id] || 0)
    )
  }
  return time
}

export const getSendingTime = (target, attacker) => {
  return new Date(
    getLandingTime(target, attacker).getTime()
    - getTravelTime(target, attacker) * 1000
  )
}

export const getScoutSend = (target, attacker, scout) => {
  return new Date(
    getSendingTime(target, attacker).getTime()
    - getTravelTime(attacker, scout) * 1000
  )
}

export const getGhostTravelString = (attacker, ghost) => {
  const travelTime = getTravelTime(attacker, ghost)
  const hours = Math.floor(travelTime / 60 / 60)
  let minutes = Math.floor((travelTime - hours * 60 * 60) / 60)
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  return `${hours}h${minutes}`
}

export const getReturnTime = (target, attacker) => {
  return new Date(
    getLandingTime(target, attacker).getTime()
    + getTravelTime(target, attacker, attacker.map) * 1000
  )
}

export const getGhostSend = (target, attacker, ghost) => {
  const ghostSend = new Date(
    getReturnTime(target, attacker).getTime()
    - getTravelTime(attacker, ghost) * 1000
  )
  if (getLandingTime(target, attacker).getTime() > ghostSend.getTime()) {
    ghostSend.setSeconds(
      ghostSend.getSeconds() + 1
    )
  }
  return ghostSend
}
