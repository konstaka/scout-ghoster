const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const SelectionSchema = new Schema({
  id: ObjectId,
  targetId: String,
  attackerId: String
});

module.exports = mongoose.model('Selection', SelectionSchema);
