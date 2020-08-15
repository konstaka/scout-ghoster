const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const OperationMetaSchema = new Schema({
  id: ObjectId,
  hittingTime: Date,
});

module.exports = mongoose.model('OperationMeta', OperationMetaSchema);
