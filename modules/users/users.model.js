const mongoose = require('mongoose');
const UserSchema = require('./users.schema');

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;