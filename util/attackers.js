const Attacker = require('../models/Attacker');

const saveAttacker = async (candidate) => {
  const existing = await Attacker.findOne(
    { x: candidate.x, y: candidate.y }
  );
  if (existing) {
    await Attacker.updateOne(
      { x: attacker.x, y: attacker.y },
      attacker
    );
    return true;
  }
  const attacker = new Attacker(candidate);
  await attacker.save();
  return false;
};

const getAttackers = async () => {
  const attackers = await Attacker.find();
  return attackers;
};

const deleteAttacker = async (attacker) => {
  await Attacker.findOneAndDelete(
    { x: attacker.x, y: attacker.y }
  );
};

module.exports = {
  saveAttacker,
  getAttackers,
  deleteAttacker
};
