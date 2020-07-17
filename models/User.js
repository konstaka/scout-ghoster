const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  email: String
});

module.exports = mongoose.model('User', UserSchema);
