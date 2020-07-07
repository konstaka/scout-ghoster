import store from '@/store/index'

/**
 * Calculates travel time in seconds on a Travian T4 (2019) map
 */
export const getTravelTime = (target, attacker) => {
  // Distance on a torus surface
  let distance = Math.sqrt(
    Math.pow(
      Math.min(
        Math.abs(attacker.x - target.xCoord),
        store.state.serverConfig.size * 2 + 1 - Math.abs(attacker.x - target.xCoord)),
      2)
    + Math.pow(
      Math.min(
        Math.abs(attacker.y - target.yCoord),
        store.state.serverConfig.size * 2 + 1 - Math.abs(attacker.y - target.yCoord)),
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
    return Math.round(distance / squaresPerSecond)
  }
  // No-TS part of travel
  let travelTime = 20 / squaresPerSecond
  // Reduce distance
  distance -= 20
  // Calculate TS factor
  const tsFactor = 1.0 + attacker.tournamentSquare * 0.2
  // Adjust speed
  squaresPerSecond *= 1 + attacker.heroBoots / 100
  squaresPerSecond *= tsFactor
  // Compute remaining time
  travelTime += distance / squaresPerSecond
  return Math.round(travelTime)
}

export const getSendingTime = (target, attacker) => {
  const landingTime = new Date(store.state.opsHittingDay)
  landingTime.setHours(store.state.opsHittingTime.HH)
  landingTime.setMinutes(store.state.opsHittingTime.mm)
  landingTime.setSeconds(store.state.opsHittingTime.ss)
  landingTime.setMilliseconds(0)
  return new Date(landingTime.getTime() - getTravelTime(target, attacker) * 1000)
}
