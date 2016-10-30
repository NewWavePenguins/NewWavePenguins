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

    $scope.toggleCompleted = function(){
      // Add to DB
      $http({
        method: 'POST',
        url: '/toggleTaskCompleted',
        data: {
            "taskId": $scope.currNode.id
        }

      }).then(function(){
        $state.reload();
      });
    };

    $scope.addTask = function () {
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
      });
    };

    $scope.addGoal = function() {
        console.log('clicked')
    }
  }


