angular.module('home.controllers', ['ui.router', 'myApp.services'])
.controller('homeController', function($scope, Goals) {

  Goals.getGoalsArray().then(function(array){
    $scope.goals = array; 
  });

});
