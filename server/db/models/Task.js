var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  completed:   Boolean,
  title:   String,
  parentId: Number
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
