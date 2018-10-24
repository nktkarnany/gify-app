var gifyApp = angular.module("gifyApp", ['ngRoute']);

gifyApp.config(function ($routeProvider) {

  $routeProvider.
  when('/', {
    templateUrl: '/views/login.html',
    controller: 'loginCtrl'
  }).
  when('/dashboard', {
    templateUrl: '/views/dashboard.html',
    controller: 'dashboardCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });

});

gifyApp.service('Auth', function () {

  this.login = function (req) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  this.logout = function () {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

});

gifyApp.service('gify', ['$http', function ($http) {

  this.search = function (req) {
    return $http({
      method: 'GET',
      url: 'https://api.giphy.com/v1/gifs/search?api_key=F4H0W1vLeAa94BX196mYLu8USqgnz0zy&q=cheeseburgers&limit=10',
      headers: {
        'Content-Type': 'application/json'
      },
      data: req
    });
  }

}]);
