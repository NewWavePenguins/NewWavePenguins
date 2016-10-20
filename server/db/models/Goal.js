var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
  completed:   Boolean,
  title:   String,
  userId: Number
});

var Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
