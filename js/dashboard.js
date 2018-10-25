var gifyApp = angular.module('gifyApp');

gifyApp.controller('dashboardCtrl', ['$scope', 'gify', '$timeout', function ($scope, gify, $timeout) {

  $scope.logout = () => {
    $location.path('/');
  }

  $scope.gifs = [];
  let offset = 0;

  function fetchGifs() {
    gify.search({
      offset: offset
    }).then(
      function (res) {
        $scope.gifs = $scope.gifs.concat(res.data.data);
        offset = res.data.pagination.offset + res.data.pagination.count;
      },
      function (err) {
        console.log(err);
      }
    );
  }
  fetchGifs();
  $timeout(fetchGifs, 3000);
}]);
