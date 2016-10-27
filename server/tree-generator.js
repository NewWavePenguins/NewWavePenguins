// dependencies
var handler = require('./request-handler');
var db = require('./db/config')
var User = require('./db/models/User');
var Goal = require('./db/models/Goal');
var Task = require('./db/models/Task');
var Promise = require('bluebird');

// // Start from goal 
// Goal.find(function(err, goals)
// })

var getTask = function (taskId) {
	return new Promise(function(resolve, reject){
      Task.findOne({_id: taskId}, function(err, task) {
      	if (err) {reject(err);}
		else {
			resolve(JSON.stringify(task));
		}      
      })
	});
}; 


exports.generateTree = function(req, res){
  var goalId = req.params.goalId;
  Goal.findOne({_id: goalId}, function(err, goal){
  	
	// inner recursive function
	var recursive = function(tasksArray) {
	  var result;
	  // base case
	  if (tasksArray.length === 0) {return [];}

	  var promises = [];
	  for (var i=0; i < tasksArray.length; i++) {
	  	promises.push(getTask(tasksArray[i]));
	  }	    
	   Promise.all(promises).then(function(children){

	   	children.forEach(function(child){
	   	  console.log('child.task',JSON.parse(child)["tasks"])
	   	  JSON.parse(child)["tasks"] = recursive(JSON.parse(child)["tasks"]);
	   	})
	   }).catch(function(err){
	    throw err;
	   });
	}
    
	goal.tasks = recursive(goal.tasks);

	res.status(200).send(goal);

	  // loop through tasks array
	  // invode the recursive function on each item

  });
};