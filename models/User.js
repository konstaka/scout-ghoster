const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const UserSchema = new Schema({
  id: ObjectId,
  email: String,
  roles: [String],
  accounts: [String],
});

module.exports = mongoose.model('User', UserSchema);
