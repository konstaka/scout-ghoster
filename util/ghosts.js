const Ghost = require('../models/Ghost');
const Village = require('../models/Village');

const saveGhost = async (user, candidate) => {
  console.log('saving ghost');
  // Retrieve player and village names
  const matchingVillage = await Village.findOne({
    xCoord: candidate.xCoord,
    yCoord: candidate.yCoord
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
          return candidate.unitSpeed === 14 ? 'EI'
            : (candidate.unitSpeed === 10 ? 'EC' : '?');
          break;
        // Teuton
        case 2:
        return candidate.unitSpeed === 9 ? 'TK' : '?';
          break;
        // Gaul
        case 3:
          return candidate.unitSpeed === 19 ? 'TT'
            : (candidate.unitSpeed === 13 ? 'H' : '?');
          break;
        default:
          return '?';
          break;
      }
    })(matchingVillage.tribe);
  }
  // Find possibly existing ghost
  let ghost = await Ghost.findById(candidate._id);
  if (ghost) {
    // Updating existing ghost
    ghost = await Ghost.findByIdAndUpdate(candidate._id, candidate);
  } else {
    // Adding new ghost
    ghost = new Ghost(candidate);
    ghost = await ghost.save();
  }
  return ghost;
};

const getGhosts = async (user) => {
  const ghosts = await Ghost.find();
  return ghosts.filter((ghost) => {
    return user.roles.includes('admin')
      || user.roles.includes('defcoord')
      || user.accounts.includes(ghost.player)
  });
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
  deleteGhost
};
