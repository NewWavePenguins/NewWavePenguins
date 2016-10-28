var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  completed:   {type: Boolean, default: false},
  title:   String,
  parentId: String,
  tasks: [String],
  goalId: String,
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
