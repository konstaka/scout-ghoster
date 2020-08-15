const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const GhostSchema = new Schema({
  id: ObjectId,
  // Ingame player name
  player: String,
  // Name of attacking village
  villageName: String,
  // Identifier of the player's village
  villageId: Number,
  // X-coordinate: NUM(-400 ... 400)
  xCoord: Number,
  // Y-coordinate: NUM(-400 ... 400)
  yCoord: Number,
  // Unit speed: NUM(>3)
  unitSpeed: Number,
  // Artefact speed factor: NUM(0.33 ... 2)
  arteSpeed: Number,
  // Tournament square: NUM(0 ... 20)
  tournamentSquare: Number,
  // Hero boots: ENUM(25, 50, 75)
  heroBoots: Number,
  // Unit amount
  ghostAmount: Number,
  // Unit abbreviation
  unitName: String,
});

module.exports = mongoose.model('Ghost', GhostSchema);
