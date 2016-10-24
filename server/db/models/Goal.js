var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
  completed: {type: Boolean, default: false},
  title: String,
  userId: String
});

var Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
