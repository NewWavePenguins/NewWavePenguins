angular.module('greenfield', ['ui.router'])

.config(function ($stateProvider, $httpProvider) {
  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'app/views/home.html',
  //     controller: 'app/controllers/home.js'
  //   })
  //   .otherwise({
  //     redirectTo: '/'
  //   });
  var homeState = {
    name: 'home',
    url: '/',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

    $stateProvider.state(homeState);
});
