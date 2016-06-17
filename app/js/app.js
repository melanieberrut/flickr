'use strict';

angular
  .module('potato', [
    'ngRoute',
    'ngSanitize',
    'ngResource',
    'ngAnimate'
  ])
  .config(['$routeProvider', function ($routeProvider) {
      // Define the different views per route
      $routeProvider
        .when('/', {
          templateUrl: 'views/listing.html'
        })
        .when('/detail/:itemId', {
          templateUrl: 'views/detail.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);
