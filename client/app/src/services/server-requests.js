angular.module('myApp.services',[])
.factory('Goals', function($http) {
//5814ee4d6a443ff8bf513563
  var getGoalsArray = function() {
    return $http({
    	method: 'GET',
    	url: '/allGoals'
    }).then(function(res){
    	return res.data;
    })
  };


  return {
  	getGoalsArray: getGoalsArray
  }

});