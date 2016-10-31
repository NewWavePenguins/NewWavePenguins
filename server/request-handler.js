//dependencies
var db = require('./db/config')
var User = require('./db/models/User');
var Goal = require('./db/models/Goal');
var Task = require('./db/models/Task');
var passport = require('passport');
var Promise = require('bluebird');
require('./passport')(passport);


// Fetch goals for a given user
exports.getGoals = function(req, res) {
  var userId = req.params.userId;
  Goal.find({userId: userId}).exec(function (err, goals){
    if (err) { throw err }
    else {
      res.status(200).send(goals);
    }
  })
};

// Add new user
exports.signup = function(req, res) {
  passport.authenticate('local-signup', {
          successRedirect : '/#/home/goals',
          failureRedirect : '/#/auth',
          failureFlash : true
      })
}

// Add a new goal to a given user
exports.addGoal = function(req, res) {
  var title = req.body.title;
  var userId = req.session.userId;
  var newGoal = new Goal({
    title: title,
    userId: userId,
  });
  newGoal.save(function(err, newGoal) {
    if (err) { throw err; }
    else {
      newGoal.goalId = newGoal._id;
      newGoal.save();
      User.findOne({_id: userId}, function(err, user) {
        if (err) throw err;
        user.goals.push(newGoal._id);
        user.save();
        res.status(200).send(newGoal);
      })
    }
  })
}

//Add new task to a given goal or task
exports.addTask = function(req, res) {
  var title = req.body.title;
  var parentId = req.body.parentId;
  var newTask = new Task({
    title: title,
    parentId: parentId,
  });
  newTask.save(function(err, newTask) {
    if (err) { throw err; }
    else {
      Goal.findOne({_id: parentId}, function(err, goal) {
        if (err || !goal) {
          Task.findOne({_id: parentId}, function(err, task) {
            if (err) throw err;
            task.tasks.push(newTask._id);
            task.save(function(err, task) {
              if (err) throw err;
              newTask.goalId = task.goalId;
              newTask.save(function(err, newTask) {
                if (err) throw err;
                res.status(200).send(newTask);
              });
            });
          })
        } else {
          goal.tasks.push(newTask._id);
          goal.save();
          newTask.goalId = goal.goalId;
          newTask.save(function(err, newTask){
            res.status(200).send(newTask);
          });
        }
      })
    }
  })

}

// Make task complete or incomplete
exports.toggleTaskCompleted = function(req, res) {
  var taskId = req.body.taskId;

  Task.findOne({ _id: taskId}).exec(function(err, task) {
    if (err) {throw err;}
    else {
      var currTask = task;
      Task.update({ _id: taskId}, {completed: !currTask.completed}, function(err, result) {
        if (err) {throw err;}
        else { 
          if (!currTask.completed && currTask.tasks.length > 0) {
            var subTaskPromises = [];
            for (var i=0; i < currTask.tasks.length; i++){
              subTaskPromises.push(makeTaskComplete(currTask.tasks[i]));
            }
            Promise.all(subTaskPromises).then(function(){
             res.status(200).send(''); 
            });
          } else {
            res.status(200).send('');
          }
        }
      });
    }
  });
}

// Remove an existing task 
exports.removeTask = function(req, res) {
  var taskId =req.body.taskId;
  
  Task.findOne({ _id: taskId}).exec(function(err, task) {
    if (err) {throw err;}
    else {
      var parentId = task.parentId;
      Goal.findOne({_id: parentId}, function(err, goal) {
        if (err || !goal) {
          Task.findOne({_id: parentId}, function(err, parentTask) {
            if (err) throw err;
            var index = parentTask.tasks.indexOf(taskId);
            parentTask.tasks.splice(index, 1);
            parentTask.save(function(){
              Task.remove({ _id: taskId}, function(err) {
                if (err) throw err;
                res.status(200).send('');
              });
            });
          });
        } else {
          var index = goal.tasks.indexOf(taskId);
          goal.tasks.splice(index, 1);
          goal.save(function(){
            Task.remove({ _id: taskId}, function(err) {
              if (err) throw err;
              res.status(200).send('');
            });
          });
        }
      })
    }
  });

}


// Check if the user is logged in
exports.isLoggedIn = function(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      next();
    } else {
    // if they aren't, redirect them to the home page
    res.redirect('/');
    }
}

// Fetch all goals for a given user from db
exports.getGoals = function(req, res) {
  var userId = req.params.userId;
  Goal.find({userId: userId}).exec(function (err, goals){
    if (err) { throw err }
    else {
      res.status(200).send(goals);
    }
  })
}

// Mark a given task as completed
function makeTaskComplete(taskId) {
  return new Promise(function(resolve, reject){
    Task.update({ _id: taskId}, {completed: true}, function(err, result) {
      if (err) { reject(err);}
      else { resolve(result);}
    });
  });
}

// Mark a given goal as completed
exports.makeGoalComplete = function(req, res) {
  var goalId = req.body.goalId;
  Goal.update({ _id: goalId}, {completed: true}, function(err, result) {
    if (err) {throw err;}
    else { res.status(200).send(result);}
  });
}

// Fetch all tasks of a given goal from db
exports.getTasksOfGoal = function(req, res) {
  Task.find({parentId: req.params.goalId}).exec(function(err, tasks){
    if (err) {throw err;}
    else { res.status(200).send(tasks); }
  });
}

// Fetch all tasks of a given task from db
exports.getTasksOfTask = function(req, res) {
  Task.find({parentId: req.params.parentId}).exec(function(err, tasks){
    if (err) {throw err;}
    else { res.status(200).send(tasks); }
  });
}
