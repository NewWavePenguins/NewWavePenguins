angular.module('greenfield', ['ngRoute'])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/home.html',
      controller: 'app/controllers/home.js'
    })
    .otherwise({
      redirectTo: '/'
    });
});
