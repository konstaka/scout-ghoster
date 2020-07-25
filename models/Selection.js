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
  scoutId: String,
  scout: {
    player: String,
    xCoord: Number,
    yCoord: Number,
    scoutArte: Number,
    scoutAmount: Number,
    arteSpeed: Number,
    tournamentSquare: Number,
    heroBoots: Number
  },
  ghostId: String,
  ghost: {
    xCoord: Number,
    yCoord: Number,
    ghostAmount: Number
  }
});

module.exports = mongoose.model('Selection', SelectionSchema);
