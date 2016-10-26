angular.module('myApp.services',[])
.factory('Tasks', function($http) {

  var getTasksTree = function() {
    return $http({
    	method: 'GET',
    	url: '/getTasksTree'
    }).then(function(res){
    	return res.data;
    })
  };

  return {
  	getTasksTree: getTasksTree
  }

});