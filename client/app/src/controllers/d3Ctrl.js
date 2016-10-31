  function addToD3($scope, $stateParams, $http, $state, Tasks) {
    for (var i=0; i < $scope.goals.length; i++) {
      if ($scope.goals[i].id === $stateParams.id) {
        $scope.d3Data = $scope.goals[i];
      }
    }
    
    // Set default value for current node to be the mother goal object
    $scope.currNode = $scope.d3Data;

    $scope.d3OnClick = function(item){
      $scope.currNode = item;
      $scope.$apply();
    };

    $scope.addTask = function () {
      // Add to DB
      Tasks.addTask($scope.newTask.title, $scope.currNode.id)
      .then(function(){
        $state.reload();
      });
    };

    $scope.toggleCompleted = function(){
      // Add to DB
      Tasks.toggleCompleted($scope.currNode.id)
      .then(function(){
        $state.reload();
      });
    };

    $scope.addGoal = function() {
        console.log('clicked')
    }
  }


