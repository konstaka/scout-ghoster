const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const FilterSchema = new Schema({
  id: ObjectId,
  coordId: Number,
  isVisible: Boolean
});

module.exports = mongoose.model('Filter', FilterSchema);
