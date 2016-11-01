  function addToD3($scope, $stateParams, $http, $state, Goals, Tasks) {
    for (var i=0; i < $scope.goals.length; i++) {
      if ($scope.goals[i].id === $stateParams.id) {
        $scope.d3Data = $scope.goals[i];
      }
    }
    
    // Set default value of current node to be the mother goal object
    $scope.currNode = $scope.d3Data;

    $scope.d3OnClick = function(item){
      $scope.currNode = item;
      $scope.$apply();
    };

    $scope.addGoal = function() {
      Goals.addGoal($scope.newGoal.title)
      .then(function(){
        console.log('INSIDE addGOAL, state', $state);
        $state.reload();
      });  
    };

    $scope.addTask = function () {
      Tasks.addTask($scope.newTask.title, $scope.currNode.id)
      .then(function(){
        $state.reload();
      });
    };

    $scope.toggleCompleted = function(){
      Tasks.toggleCompleted($scope.currNode.id)
      .then(function(){
        $state.reload();
      });
    };

    $scope.removeTask = function () {
      Tasks.removeTask($scope.currNode.id)
      .then(function(){
        $state.reload();
      });
    };

  }


