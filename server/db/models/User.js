var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  local: {
    email: String,
    password: String,
  },
  firstName:   String,
  lastName:   String,
  goals: [String],
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


var User = mongoose.model('User', userSchema);

module.exports = User;
