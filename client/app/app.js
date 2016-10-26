angular.module('greenfield', ['ui.router','stormpath', 'stormpath.templates'])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider

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

.state('registration', {
url: '/registration',
templateUrl: 'app/views/registration.html'
})

})

//   .run(function($stormpath) {
//   $stormpath.uiRouter({
//     loginState: 'login',
//     defaultPostLoginState: 'home'
//   });
// });
