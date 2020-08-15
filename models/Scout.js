const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const ScoutSchema = new Schema({
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
  // Amount of scouts: NUM(>0)
  scoutAmount: Number,
  // Artefact factor: NUM(1, 3, 5, 10)
  scoutArte: Number,
});

module.exports = mongoose.model('Scout', ScoutSchema);
