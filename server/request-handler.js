//dependencies
var db = require('./db/config')
var User = require('./db/models/User');
var Goal = require('./db/models/Goal');
var Task = require('./db/models/Task');



//test
exports.getHandler = function(req, res) {
  User.find(function(err, users) {
    if (err) {throw err}
    else {
      res.status(200).send(users);
    }
  })
};

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
  var username = req.body.username;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var newUser = new User({
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
    goals: [],
  });
  newUser.save(function(err, newUser) {
    if (err) { throw err }
    else {
      res.status(200).send(newUser);
    }
  })
}

// Add a new goal to a given user
exports.addGoal = function(req, res) {
  var title = req.body.title;
  var userId = req.body.userId;
  var newGoal = new Goal({
    title: title,
    userId: userId,
  });
  newGoal.save(function(err, newGoal) {
    if (err) { throw err; }
    else {
      res.status(200).send(newGoal);
      User.findOne({_id: userId}, function(err, user) {
        if (err) throw err;
        user.goals.push(newGoal._id);
        user.save();
      })
    }
  })
}

//Add new task
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
      res.status(200).send(newTask);
      Goal.findOne({_id: parentId}, function(err, goal) {
        if (err || !goal) {
          Task.findOne({_id: parentId}, function(err, task) {
            if (err) throw err;
            task.tasks.push(newTask._id);
            task.save();
          })
        } else {
          goal.tasks.push(newTask._id);
          goal.save();
        }
      })
    }
  })
}

// Make task complete or incomplete
exports.toggleTaskCompleted = function(req, res) {
  var taskId = req.body.taskId;

  var ourTask = Task.findOne({ _id: taskId}).exec(function(err, task) {
    if (err) {throw err;}
    else {
      var ourTask = task;
      Task.update({ _id: taskId}, {completed: !ourTask.completed}, function(err, result) {
        if (err) {throw err;}
        else { res.status(200).send(result);}
      });
    }
  });
}

exports.makeTaskComplete = function(req, res) {
  var taskId = req.body.taskId;
  Task.update({ _id: taskId}, {completed: true}, function(err, result) {
    if (err) {throw err;}
    else { res.status(200).send(result);}
  });
}


exports.makeGoalComplete = function(req, res) {
  var goalId = req.body.goalId;
  Goal.update({ _id: goalId}, {completed: true}, function(err, result) {
    if (err) {throw err;}
    else { res.status(200).send(result);}
  });
}

exports.getTasksOfGoal = function(req, res) {
  Task.find({parentId: req.params.goalId}).exec(function(err, tasks){
    if (err) {throw err;}
    else { res.status(200).send(tasks); }
  });
}

exports.getTasksOfTask = function(req, res) {
  Task.find({parentId: req.params.parentId}).exec(function(err, tasks){
    if (err) {throw err;}
    else { res.status(200).send(tasks); }
  });
}

// exports.getElemsOfGoal = function(req, res) {
//   //set an empty output that will be populated with all descendandts of a given goalId
//   var out = [];

//   Goal.find({_id: req.params.id}).exec(goalSearchCB);

//   function goalSearchCB(err, el){
//     if (err) { throw err; }
//     else {
//       res.status(200);
//       //adds goal to output
//       out.push(el[0]);

//       function addChildTasks(id) {

//       }

//       Task.find({parentId: req.params.goalId}).exec(function(err, tasks){
//         if (err) {throw err;}
//         else {
//           tasks.forEach(function(task) {
//             out.push(task);
//             addChildTasks(task.id);
//           })
//         }
//       });

//       out = goalTasks.length;

//       res.send(out);
//     }
//   };
// }




