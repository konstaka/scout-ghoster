const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const SelectionSchema = new Schema({
  id: ObjectId,
  attackerId: String,
  targetId: String,
  scoutName: String,
  scoutId: String,
  ghostName: String,
  ghostId: String,
});

module.exports = mongoose.model('Selection', SelectionSchema);
