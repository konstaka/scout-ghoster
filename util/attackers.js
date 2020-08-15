const Attacker = require('../models/Attacker');
const Village = require('../models/Village');

const saveAttacker = async (attacker) => {
  const candidate = attacker;
  // Retrieve player and village names
  const matchingVillage = await Village.findOne({
    xCoord: candidate.xCoord,
    yCoord: candidate.yCoord,
  });
  // Attach info
  if (matchingVillage) {
    candidate.player = matchingVillage.playerName;
    candidate.villageName = matchingVillage.villageName;
  }
  // Find possibly existing attacker
  let savedAttacker = await Attacker.findById(candidate._id);
  if (savedAttacker) {
    // Update existing attacker
    savedAttacker = await Attacker.findByIdAndUpdate(candidate._id, candidate);
  } else {
    // Adding new attacker
    savedAttacker = await new Attacker(candidate).save();
  }
  return savedAttacker;
};

const getAttackers = async () => {
  const attackers = await Attacker.find();
  return attackers;
};

const deleteAttacker = async (attackerId) => {
  const res = await Attacker.findByIdAndDelete(attackerId);
  return res;
};

module.exports = {
  saveAttacker,
  getAttackers,
  deleteAttacker,
};
