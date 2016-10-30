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

  return {
  	getGoalsArray: getGoalsArray
  }

});