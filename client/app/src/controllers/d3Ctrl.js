
angular.module('myApp.controllers')
  .controller('d3Ctrl', function($scope){

    $scope.d3Data = [
      {
        "id": 12,
        "title": "Graduate from HR!!!",
        "completed": false,
        "children": [
          {
            "id": 34,
            "title": "Finish Greenfield Project",
            "completed": false,
            "children": [
              {
                "id": 56,
                "title": "Finish front-end",
                "completed": false,
                "children": []
              },
              {
                "id": 78,
                "title": "Finish back-end",
                "completed": false,
                "children": []
              }
            ]
          },
          {
            "id": 910,
            "title": "Finish Legacy Project",
            "completed": false,
            "children": []
          }
        ]
      }
    ];

    $scope.currNode = $scope.d3Data[0];
    
    $scope.d3OnClick = function(item){
      $scope.currNode = item;
      $scope.$apply();
    };

    $scope.addTask = function () {
      $scope.d3Data[0].children[0].children.push({"title": $scope.newTask.title});
      // console.log($scope.d3Data)
    };
  });


