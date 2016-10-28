// dependencies
var handler = require('./request-handler');
var db = require('./db/config')
var User = require('./db/models/User');
var Goal = require('./db/models/Goal');
var Task = require('./db/models/Task');
var Promise = require('bluebird');
var mp = require('mongodb-promise');

// p.then(function(value) {
//    // fulfillment
//   }, function(reason) {
//   // rejection
// });

exports.generateTree = function(req, res){

  var goalId = req.params.goalId;
  var currGoal;
  var tasksArray;
//find goal set goal to variable

  Goal.findOne({_id: goalId}, function(err, goal) {
    if (err) throw err;
    currGoal = {
      _id: goal._id.toString(),
      title: goal.title,
      userId: goal.userId,
      tasks: goal.tasks,
      completed: goal.completed,
      goalId: goal.goalId
    };


    Task.find({goalId: goalId}, function(err, tasksArr) {

      tasksArray = tasksArr.map(function(task){
        return {
          _id: task._id.toString(),
          title: task.title,
          tasks: task.tasks,
          completed: task.completed,
          goalId: task.goalId
        };
      });

      tasksArray.push(currGoal);
      console.log('TASKSATTAY', tasksArray);


      var idToObj = function(input) {
        if (Array.isArray(input)) {
          var outArr = input.map(function(val) {
            for (var i = 0; i < tasksArray.length; i++) {
              if (tasksArray[i]['_id'].toString() === val) {
                // console.log('IM INSIDE IF')
                return tasksArray[i];
              }
            }
          })
          // console.log('outArr', outArr)
          return outArr;
        } else {
          console.log('in else');
          for (var j = 0; j < tasksArray.length; j++) {
            // console.log('tasksArr_id', tasksArray[j]['_id'], 'input', input)
            if (tasksArray[j]['_id'].toString() === input) {
              return tasksArray[j];
            }
          }
        }
      }

      var transformChildren = function(obj) {
        var objOut = {};
        for (var i in obj) {
          objOut[i] = obj[i];
        }
        var goodArr = idToObj(obj['tasks']);
        objOut['tasks'] = goodArr;
        return objOut;
      }

      var fullObj = function(rootId) {

        var myObj = idToObj(rootId);
        // console.log('myObj', myObj)


        var recurse = function(obj) {
          var outObj = {};
          for (var i in obj) outObj[i] = obj[i];
            // console.log('obj', obj);
          if (obj['tasks'].length === 0) return outObj;
          outObj = transformChildren(obj);
          outObj['tasks'] = outObj['tasks'].map(function(child) {
            // console.log('outObj', outObj)
            return recurse(child);
          });
          return outObj;
        }

        return recurse(myObj);
      }

      // console.log(fullObj(goalId));
      res.status(200).send(fullObj(goalId));
    });
  });

};

    //find all tasks with goal id





// var greetingPromise = sayHello();
// greetingPromise.then(function (greeting) {
//     console.log(greeting);    // 'hello world’
// });


  // var transformChildren = function(obj) {
  //   var objOut = {};
  //   for (var i in obj) objOut[i] = obj[i];
  //   var goodArr = getTasksOrGoals(obj['tasks']);
  //   objOut['tasks'] = goodArr;
  //   return objOut;
  // }

  // var fullObj = function(rootId) {
  //   var myObj = getTasksOrGoals(rootId);

  //   var recurse = function(obj) {

  //     var outObj = {};
  //     for (var i in obj) outObj[i] = obj[i];
  //     if (obj['tasks'].length === 0) return obj;
  //     outObj = transformChildren(obj);
  //     outObj['children'] = outObj['children'].map(function(child) {
  //       return recurse(child);
  //     });
  //     return outObj;

  //   }
  // }

  // // function foo(){
  // //     return Promise.resolve("Value");
  // // }

  // // foo().then(alert);
  // var finalOut = 'hey';
  // function go(goalId) {
  //   finalOut = fullObj(goalId);
  //   return Promise.resolve(finalOut);
  // }

  // go(goalId).then(function() { finalCB(); });

  // function finalCB() { res.status(200).send(finalOut); }



//VVVVVVVVVVVVVVVVVV






