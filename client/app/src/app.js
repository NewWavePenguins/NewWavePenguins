// create the angular app
angular.module('myApp', [
  'ui.router',
  'stormpath',
  'stormpath.templates',
  'myApp.controllers',
  'myApp.directives'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider

    .state('home', {
    url: '/home',
    templateUrl: '../views/home.html',
    sp: {
      authenticate: true
    }
    // controller: homeController
    // onEnter: function($state) {
    //   $state.go('main.street');
    // }
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
