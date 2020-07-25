const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const SelectionSchema = new Schema({
  id: ObjectId,
  attackerId: String,
  attacker: {
    xCoord: Number,
    yCoord: Number,
    player: String,
    villageName: String
  },
  targetId: String,
  target: {
    xCoord: Number,
    yCoord: Number,
    playerName: String,
    villageName: String
  },
  scoutName: String,
  scout: {
    xCoord: Number,
    yCoord: Number
  },
  ghostName: String,
  ghost: {
    xCoord: Number,
    yCoord: Number
  }
});

module.exports = mongoose.model('Selection', SelectionSchema);
