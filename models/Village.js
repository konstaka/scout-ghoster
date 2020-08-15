const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const VillageSchema = new Schema({
  id: ObjectId,
  coordId: Number,
  xCoord: Number,
  yCoord: Number,
  tribe: Number,
  villageId: Number,
  villageName: String,
  playerId: Number,
  playerName: String,
  allyId: Number,
  allyName: String,
  population: Number,
  updatedAt: Date,
});

module.exports = mongoose.model('Village', VillageSchema);
