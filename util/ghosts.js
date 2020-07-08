const Ghost = require('../models/Ghost');
const Village = require('../models/Village');

const saveGhost = async (candidate) => {
  // Retrieve player and village names
  const matchingVillage = await Village.findOne({
    xCoord: candidate.x,
    yCoord: candidate.y
  });
  if (matchingVillage) {
    candidate.player = matchingVillage.playerName;
    candidate.villageName = matchingVillage.villageName;
    candidate.unitName = ((tribe) => {
      switch (tribe) {
        case 1:
          return candidate.unitSpeed === 14 ? 'EI'
            : (candidate.unitSpeed === 10 ? 'EC' : '?');
          break;
        case 2:
        return candidate.unitSpeed === 9 ? 'TK' : '?';
          break;
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
  let ghost = await Ghost.findByIdAndUpdate(candidate._id, candidate);
  if (!ghost) {
    ghost = new Ghost(candidate);
    ghost = await ghost.save();
  }
  return ghost;
};

const getGhosts = async () => {
  const ghosts = await Ghost.find();
  return ghosts;
};

const deleteGhost = async (ghostId) => {
  const res = await Ghost.findByIdAndDelete(ghostId);
  return res;
};

module.exports = {
  saveGhost,
  getGhosts,
  deleteGhost
};
