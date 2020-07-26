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
  // Baseline speed
  let squaresPerSecond = attacker.unitSpeed
    * store.state.serverConfig.speed
    * attacker.arteSpeed
    / 60
    / 60
  // Return if no TS
  if (distance <= 20 || attacker.tournamentSquare === 0) {
    const time = distance / squaresPerSecond
    return Math.round(map ? time * (100 - map) / 100 : time)
  }
  // No-TS part of travel
  let travelTime = 20 / squaresPerSecond
  // Reduce distance
  distance -= 20
  // Calculate TS factor
  const tsFactor = 1.0 + attacker.tournamentSquare * 0.2
  // Adjust speed
  squaresPerSecond *= 1 + (attacker.heroBoots ? attacker.heroBoots : 0) / 100
  squaresPerSecond *= tsFactor
  // Compute remaining time
  travelTime += distance / squaresPerSecond
  return Math.round(map ? travelTime * (100 - map) / 100 : travelTime)
}

const landingTime = () => {
  const time = new Date(store.state.opsHittingDay)
  time.setHours(store.state.opsHittingTime.HH)
  time.setMinutes(store.state.opsHittingTime.mm)
  time.setSeconds(store.state.opsHittingTime.ss)
  time.setMilliseconds(0)
  return time
}

export const getSendingTime = (target, attacker) => {
  return new Date(
    landingTime().getTime()
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
    landingTime().getTime()
    + getTravelTime(target, attacker, attacker.map) * 1000
  )
}

export const getGhostSend = (target, attacker, ghost) => {
  return new Date(
    getReturnTime(target, attacker).getTime()
    - getTravelTime(attacker, ghost) * 1000
  )
}
