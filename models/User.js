const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  email: String,
  roles: [String],
  accounts: [String]
});

module.exports = mongoose.model('User', UserSchema);
