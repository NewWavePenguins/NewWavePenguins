angular.module('myApp.services',[])
.factory('Tasks', function($http) {

  var addOne = function() {
    return $http({
    	method: 'GET',
    	url: '/getAll'
    })
  };

  return {
  	addOne: addOne
  }

});