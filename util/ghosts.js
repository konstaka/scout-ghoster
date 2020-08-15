const Ghost = require('../models/Ghost');
const Village = require('../models/Village');

const saveGhost = async (user, ghost) => {
  const candidate = ghost;
  console.log('saving ghost');
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
    && !user.roles.includes('ghost')) {
    return 'Not enough permissions';
  }
  // Attach info
  if (matchingVillage) {
    candidate.player = matchingVillage.playerName;
    candidate.villageName = matchingVillage.villageName;
    candidate.villageId = matchingVillage.villageId;
    candidate.unitName = ((tribe) => {
      switch (tribe) {
        // Roman
        case 1:
          if (candidate.unitSpeed === 14) return 'EI';
          return candidate.unitSpeed === 10 ? 'EC' : '?';
        // Teuton
        case 2:
          return candidate.unitSpeed === 9 ? 'TK' : '?';
        // Gaul
        case 3:
          if (candidate.unitSpeed === 19) return 'TT';
          return candidate.unitSpeed === 13 ? 'H' : '?';
        default:
          return '?';
      }
    })(matchingVillage.tribe);
  }
  // Find possibly existing ghost
  let savedGhost = await Ghost.findById(candidate._id);
  if (savedGhost) {
    // Updating existing ghost
    savedGhost = await Ghost.findByIdAndUpdate(candidate._id, candidate);
  } else {
    // Adding new ghost
    savedGhost = await new Ghost(candidate).save();
  }
  return savedGhost;
};

const getGhosts = async (user) => {
  const ghosts = await Ghost.find();
  return ghosts.filter((ghost) => user.roles.includes('admin')
      || user.roles.includes('defcoord')
      || user.accounts.includes(ghost.player));
};

const deleteGhost = async (user, ghostId) => {
  const ghost = await Ghost.findById(ghostId);
  if (!user.accounts.includes(ghost.player)
    && !user.roles.includes('admin')
    && !user.roles.includes('defcoord')) {
    return 'Not your village';
  }
  if (!user.roles.includes('admin')
    && !user.roles.includes('defcoord')
    && !user.roles.includes('ghost')) {
    return 'Not enough permissions';
  }
  const res = await Ghost.findByIdAndDelete(ghostId);
  return res;
};

module.exports = {
  saveGhost,
  getGhosts,
  deleteGhost,
};
