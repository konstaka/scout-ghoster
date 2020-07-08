const Scout = require('../models/Scout');
const Village = require('../models/Village');

const saveScout = async (candidate) => {
  let scout = await Scout.findByIdAndUpdate(candidate._id, candidate);
  if (!scout) {
    // Retrieve player and village names
    const matchingVillage = await Village.findOne({
      xCoord: candidate.x,
      yCoord: candidate.y
    });
    if (matchingVillage) {
      candidate.player = matchingVillage.playerName;
      candidate.villageName = matchingVillage.villageName;
      candidate.unitSpeed = ((tribe) => {
        switch (tribe) {
          case 1:
            return 16;
            break;
          case 2:
            return 9;
            break;
          case 3:
            return 17;
            break;
          default:
            return undefined;
            break;
        }
      })(matchingVillage.tribe);
    }
    scout = new Scout(candidate);
    scout = await scout.save();
  }
  return scout;
};

const getScouts = async () => {
  const scouts = await Scout.find();
  return scouts;
};

const deleteScout = async (scoutId) => {
  const res = await Scout.findByIdAndDelete(scoutId);
  return res;
};

module.exports = {
  saveScout,
  getScouts,
  deleteScout
};
