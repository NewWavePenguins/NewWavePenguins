angular.module('greenfield', ['ui.router','stormpath', 'stormpath.templates'])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'app/views/home.html',
  //     controller: 'app/controllers/home.js'
  //   })
  //   .otherwise({
  //     redirectTo: '/'
  //   });
  $stateProvider
  // .state('homeState' = {
  //   name: 'home',
  //   url: '/home',
  //   template: '<h3>Its the UI-Router hello world app!</h3>'
  // }

  .state('home', {
  url: '/home',
  templateUrl: 'app/views/home.html',
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
  templateUrl: 'app/views/login.html'
})

});

//   .run(function($stormpath) {
//   $stormpath.uiRouter({
//     loginState: 'login',
//     defaultPostLoginState: 'home'
//   });
// });
