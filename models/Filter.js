const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const FilterSchema = new Schema({
  id: ObjectId,
  coordId: Number,
  isVisible: Boolean,
});

module.exports = mongoose.model('Filter', FilterSchema);
