const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

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
