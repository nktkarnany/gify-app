var gifyApp = angular.module('gifyApp');

gifyApp.controller('dashboardCtrl', ['$scope', '$location', 'gify', function ($scope, $location, gify) {

  $scope.logout = () => {
    $location.path('/');
  }

}]);
