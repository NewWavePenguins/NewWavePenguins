angular.module('myApp.services',[])
.factory('Goals', function($http) {

  var getGoalsArray = function() {
    return $http({
    	method: 'GET',
    	url: '/allGoals'
    }).then(function(res){
    	return res.data;
    })
  };

  var addGoal = function(title){
    return $http({
        method: 'POST',
        url: '/home/goals/addGoal',
        data: {
            "title" : title,
        }
    })
  }

  return {
  	getGoalsArray: getGoalsArray,
    addGoal: addGoal
  }

})
.factory('Tasks', function($http){

  var addTask = function(title, parentId){
    return $http({
        method: 'POST',
        url: '/addTask',
        data: {
            "title" : title,
            "parentId": parentId
        }
    })
  };

  var toggleCompleted = function(taskId){
    return $http({
        method: 'POST',
        url: '/toggleTaskCompleted',
        data: {
            "taskId": taskId
        }
      });
  };

  return {
    addTask: addTask,
    toggleCompleted: toggleCompleted
  }

});