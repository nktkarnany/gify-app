var gifyApp = angular.module('gifyApp');

gifyApp.controller('loginCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.login = () => {
    $location.path('/dashboard');
  };
}]);
