angular.module('home.controllers', ['ui.router', 'myApp.services'])
.controller('homeController', function($scope, Goals, Tasks, $stateParams, $http, $state) {

  Goals.getGoalsArray().then(function(array){
    $scope.goals = array;
    addToD3($scope, $stateParams, $http, $state, Tasks);
  });

});
