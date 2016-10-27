angular.module('myApp.services',[])
.factory('Tasks', function($http) {

  var getGoalsArray = function() {
    return $http({
    	method: 'GET',
    	url: '/getGoalsArray'
    }).then(function(res){
    	return res.data;
    })
  };

  // var postChange = function(){
  // 	return $http().then
  // }









  return {
  	getGoalsArray: getGoalsArray
  }

});