  function addToD3($scope, $stateParams, $http, $state) {
    for (var i=0; i < $scope.goals.length; i++) {
      if ($scope.goals[i].id === $stateParams.id) {
        $scope.d3Data = $scope.goals[i];
      }
    }

    $scope.currNode = $scope.d3Data;

    $scope.d3OnClick = function(item){
      $scope.currNode = item;
      $scope.$apply();
    };

    $scope.addTask = function () {
      // $scope.d3Data.children[0].children.push({"title": $scope.newTask.title});

      // Add to DB
      $http({
        method: 'POST',
        url: '/addTask',
        data: {
            "title" : $scope.newTask.title,
            "parentId": $scope.currNode.id
        }
      }).then(function(){
        $state.reload();
        // Add to front end scope.d3Data
        // resursive function to traverse d3Data and inject the new Task at the right place
        // var taskToStore = {
        //    "id": "5814eec179e36cfba0ba72fe",
        //    "title": $scope.newTask.title,
        //    "children": [],
        //    "completed": false,
        // };
      // });
    });
  };

    $scope.addGoal = function() {
        console.log('clicked')
    }

  }


