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
    sp: {
      authenticate: true
    },
    controller: 'homeController'
    // onEnter: function($state) {
    //   $state.go('home.goals');
    // }
  })

    .state('home.goals', {
     url: '/goals',
     templateUrl: '../views/goals.html'
   })

   .state('home.goals.id', {
     url: '/:id',
     templateUrl: '../views/goal.html',
     controller: 'd3Ctrl'
     // controller: function($scope, $stateParams){
     //          $scope.person = $scope.contacts[$stateParams.id];
     //        }
   })

    .state('login', {
    url: '/login',
    templateUrl: '../views/login.html'
  })

  .state('registration', {
  url: '/registration',
  templateUrl: '../views/registration.html'
  })

  })

  //   .run(function($stormpath) {
  //   $stormpath.uiRouter({
  //     loginState: 'login',
  //     defaultPostLoginState: 'home'
  //   });
  // });

  // setup dependency injection
  angular.module('d3', []);
  angular.module('myApp.controllers', []);
  angular.module('myApp.directives', ['d3']);
