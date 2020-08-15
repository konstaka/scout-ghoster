const Scout = require('../models/Scout');
const Village = require('../models/Village');

const saveScout = async (user, scout) => {
  const candidate = scout;
  // Retrieve player and village names
  const matchingVillage = await Village.findOne({
    xCoord: candidate.xCoord,
    yCoord: candidate.yCoord,
  });
    // Check permissions
  if (!matchingVillage && !user.roles.includes('admin')) {
    return 'Village not found';
  }
  if (matchingVillage
    && !user.accounts.includes(matchingVillage.playerName)
    && !user.roles.includes('admin')
    && !user.roles.includes('defcoord')) {
    return 'Not your village';
  }
  if (!user.roles.includes('admin')
    && !user.roles.includes('defcoord')
    && !user.roles.includes('scout')) {
    return 'Not enough permissions';
  }
  // Attach info
  if (matchingVillage) {
    candidate.player = matchingVillage.playerName;
    candidate.villageName = matchingVillage.villageName;
    candidate.villageId = matchingVillage.villageId;
    candidate.unitSpeed = ((tribe) => {
      switch (tribe) {
        // Roman
        case 1:
          return 16;
          // Teuton
        case 2:
          return 9;
          // Gaul
        case 3:
          return 17;
        default:
          return undefined;
      }
    })(matchingVillage.tribe);
  }
  // Find possibly existing scout
  let savedScout = await Scout.findById(candidate._id);
  if (savedScout) {
    // Updating existing scout
    savedScout = await Scout.findByIdAndUpdate(candidate._id, candidate);
  } else {
    // Adding new scout
    savedScout = await new Scout(candidate).save();
  }
  return savedScout;
};

const getScouts = async (user) => {
  const scouts = await Scout.find();
  return scouts.filter((scout) => user.roles.includes('admin')
      || user.roles.includes('defcoord')
      || user.accounts.includes(scout.player));
};

const deleteScout = async (user, scoutId) => {
  const scout = await Scout.findById(scoutId);
  if (!user.accounts.includes(scout.player)
    && !user.roles.includes('admin')
    && !user.roles.includes('defcoord')) {
    return 'Not your village';
  }
  if (!user.roles.includes('admin')
    && !user.roles.includes('defcoord')
    && !user.roles.includes('scout')) {
    return 'Not enough permissions';
  }
  const res = await Scout.findByIdAndDelete(scoutId);
  return res;
};

module.exports = {
  saveScout,
  getScouts,
  deleteScout,
};
