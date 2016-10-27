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
			task = JSON.stringify(task);
			task.slice(1, task.length - 1);

			console.log(task);
			resolve(task);
		}      
      })
	});
}; 


exports.generateTree = function(req, res){
  var goalId = req.params.goalId;
  Goal.findOne({_id: goalId}, function(err, goal){
  	var promises = [];
  	for (var i=0; i < goal.tasks.length; i++) {
  		promises.push(getTask(goal.tasks[i]));
  	}
    
    Promise.all(promises).then(function(taskArray){
    	goal.tasks = taskArray;
    	res.status(200).send(goal);
    }).catch(function(err){
    	throw err;
    });

  });
	
};