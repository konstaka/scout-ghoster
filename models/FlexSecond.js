const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const FlexSecondSchema = new Schema({
  id: ObjectId,
  targetId: String,
  attackerId: String,
  seconds: Number,
});

module.exports = mongoose.model('FlexSecond', FlexSecondSchema);
