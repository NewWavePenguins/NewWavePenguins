angular.module('myApp.services',[])
.factory('Goals', function($http) {

  var getGoalsArray = function() {
    return $http({
    	method: 'GET',
    	url: '/allGoals/5813e667ac5ac74563b28bbf'
    }).then(function(res){
      console.log(res.data);
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