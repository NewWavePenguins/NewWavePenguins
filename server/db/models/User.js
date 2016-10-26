var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  String,
  password: String,
  firstName:   String,
  lastName:   String,
  goals: [String],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
