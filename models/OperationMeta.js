const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const OperationMetaSchema = new Schema({
  id: ObjectId,
  hittingTime: Date
});

module.exports = mongoose.model('OperationMeta', OperationMetaSchema);
