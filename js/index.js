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

// A service to save api calls related to our gify app
gifyApp.service('gify', ['$http', function ($http) {

  this.search = function (req) {

    let end_point = 'https://api.giphy.com/v1/gifs/search?api_key=F4H0W1vLeAa94BX196mYLu8USqgnz0zy&limit=20';

    if (req.hasOwnProperty('query'))
      end_point += '&q=' + req.query;

    if (req.hasOwnProperty('offset'))
      end_point += '&offset=' + req.offset;

    return $http({
      method: 'GET',
      url: end_point,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}]);

// A directive to listen hover event for each gif
// A gif is rendered by default and only on hover a static image is displayed
gifyApp.directive('gif', function () {
  return {
    restrict: 'A',
    scope: {
      gif: "="
    },
    link: function (scope, element, attrs) {
      element.on('mouseenter', function () {
        attrs.$set('ngSrc', scope.gif.images['480w_still'].url);
        element.addClass('hovered');
      });
      element.on('mouseleave', function () {
        attrs.$set('ngSrc', scope.gif.images.fixed_width.url);
        element.removeClass('hovered');
      });
    }
  };
});
