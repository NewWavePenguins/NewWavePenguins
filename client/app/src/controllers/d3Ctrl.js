(function () {
  'use strict';

  angular.module('myApp.controllers')
    .controller('d3Ctrl', function($scope){
      $scope.title = "GoalTree";

      $scope.d3Data = [
        {
          "title": "Graduate from HR!!!",
          "children": [
            {
              "title": "Finish Greenfield Project",
              "children": [
                {
                  "title": "Finish front-end",
                },
                {
                  "title": "Finish back-end",
                }
              ]
            },
            {
              "title": "Finish Legacy Project",
            }
          ]
        }
      ];

      $scope.d3OnClick = function(item){
        console.log(item.title);
      };
    });

}());
