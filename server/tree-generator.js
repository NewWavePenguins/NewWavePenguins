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
//^^^^^^^^^^^^^^^^^

  var goalId = req.params.goalId;

//$$$$$$$$$$$$$$$$
  var getTasksOrGoals = function (input) {

    function findSingleTaskOrGoal(id){
      var result = {};
      function findSingleTask(id) {
        Task.findOne({_id: id}, function(err, task){
          if (err) throw err;
          result = task;
        }).then(function(){cb();}, function(){console.log('err1');});
      }

      var failed = false;
      var myGoal = Goal.findOne({_id: id}, function(err, goal){
        if (err || goal === null || goal['title'] === undefined) { failed = true; }
      });

      if (!failed) {
        myGoal.then(function (goal) {
          result = goal;
          cb();
        })
      } else {
        findSingleTask(id);
      }
      function cb() { return result; }
    }


    // var query = Band.findOne({name: "Guns N' Roses"});
    // assert.ok(!(query instanceof require('mpromise')));

    // // A query is not a fully-fledged promise, but it does have a `.then()`.
    // query.then(function (doc) {
    //   // use doc
    // });

    if (Array.isArray(input)) {
      var myMap = [];
      var mapify = function(input){
        myMap = input.map(function(id) { findSingleTaskOrGoal(id); });
      }
      mapify(input).then(function() {return myMap})

    } else {


      return findSingleTaskOrGoal(input);

    }

  };
//$$$$$$$$$$$$$$$$$$$

// var greetingPromise = sayHello();
// greetingPromise.then(function (greeting) {
//     console.log(greeting);    // 'hello world’
// });


  var transformChildren = function(obj) {
    var objOut = {};
    for (var i in obj) objOut[i] = obj[i];
    var goodArr = getTasksOrGoals(obj['tasks']);
    objOut['tasks'] = goodArr;
    return objOut;
  }

  var fullObj = function(rootId) {
    var myObj = getTasksOrGoals(rootId);

    var recurse = function(obj) {

      var outObj = {};
      for (var i in obj) outObj[i] = obj[i];
      if (obj['tasks'].length === 0) return obj;
      outObj = transformChildren(obj);
      outObj['children'] = outObj['children'].map(function(child) {
        return recurse(child);
      });
      return outObj;

    }
  }

  // function foo(){
  //     return Promise.resolve("Value");
  // }

  // foo().then(alert);
  var finalOut = 'hey';
  function go(goalId) {
    finalOut = fullObj(goalId);
    return Promise.resolve(finalOut);
  }

  go(goalId).then(function() { finalCB(); });

  function finalCB() { res.status(200).send(finalOut); }



//VVVVVVVVVVVVVVVVVV
};






