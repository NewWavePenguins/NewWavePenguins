(function () {
  'use strict';

  angular.module('myApp.controllers')
    .controller('d3Ctrl', function($scope){
      $scope.title = "GoalTree";

      $scope.d3Data = [
        {
          "id": 12,
          "title": "Graduate from HR!!!",
          "children": [
            {
              "id": 34,
              "title": "Finish Greenfield Project",
              "children": [
                {
                  "id": 56,
                  "title": "Finish front-end",
                },
                {
                  "id": 78,
                  "title": "Finish back-end",
                }
              ]
            },
            {
              "id": 910,
              "title": "Finish Legacy Project",
            }
          ]
        }
      ];

      $scope.d3OnClick = function(item){
        console.log(item.id);
        $scope.currNode = item;
      };

      $scope.addTask = function () {
        $scope.d3Data[0].children.push({"title": $scope.newTask.title});
        // console.log($scope.d3Data)
      };
    });

}());
