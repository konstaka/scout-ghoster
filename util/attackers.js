const Attacker = require('../models/Attacker');

const saveAttacker = async (candidate) => {
  let attacker = await Attacker.findByIdAndUpdate(candidate._id, candidate);
  if (!attacker) {
    attacker = new Attacker(candidate);
    attacker = await attacker.save();
  }
  return attacker;
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
  deleteAttacker
};
