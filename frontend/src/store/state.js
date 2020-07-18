const initialState = {
  isSignIn: false,
  roles: [],
  opsHittingDay: null,
  opsHittingTime: {},
  attackers: [],
  targets: [],
  filter: {},
  scouts: [],
  ghosts: [],
  selections: [],
  serverConfig: {
    speed: 1,
    size: 200
  },
  unitSpeeds: [3, 4, 5, 6, 7, 9, 10, 13, 14, 15, 16, 17, 19, 20, 22, 25],
  arteSpeeds: [0.33, 0.5, 0.67, 1, 1.5, 2],
  tsLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  heroBoots: [0, 25, 50, 75],
  maps: [0, 30, 40, 50],
  scoutArtes: [1, 3, 5, 10]
}

export default initialState
