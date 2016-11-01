// create the angular app
angular.module('myApp', [
  'ui.router',
  'home.controllers',
  'myApp.controllers',
  'myApp.directives',
  'myApp.services'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider

    .state('home', {
    url: '/home',
    templateUrl: '../views/home.html',
    controller: 'homeController'
  })

    .state('home.goals', {
      url: '/goals',
      templateUrl: '../views/goals.html',
   })

     .state('home.goals.addGoal', {
       url: '/addGoal',
       templateUrl: '../views/goals.html',
    })

   .state('home.goals.id', {
     url: '/:id',
     templateUrl: '../views/goal.html',
   })

    .state('login', {
    url: '/login',
    templateUrl: '../views/login.html'
  })

  .state('signup', {
  url: '/signup',
  templateUrl: '../views/signup.html'
  })

  .state('auth', {
  url: '/auth',
  templateUrl: '../views/auth.html'
  })

  .state('profile', {
  url: '/profile',
  templateUrl: '../views/profile.html'
  })

function checkLoggedin($q, $timeout, $http, $location, $rootScope, $scope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user) {
      $rootScope.errorMessage = null;
      //User is Authenticated
      if (user !== '0') {
        $rootScope.currentUser = user;
        deferred.resolve();
      } else { //User is not Authenticated
        $rootScope.errorMessage = 'You need to log in.';
        deferred.reject();
        $scope.go('/login');
      }
    });
    return deferred.promise;
  }

  });

  // setup dependency injection
  angular.module('d3', []);
  angular.module('myApp.controllers', []);
  angular.module('myApp.directives', ['d3']);
