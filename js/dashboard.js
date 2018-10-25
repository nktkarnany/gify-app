var gifyApp = angular.module('gifyApp');

gifyApp.controller('dashboardCtrl', ['$scope', 'gify', '$timeout', function ($scope, gify, $timeout) {

  $scope.logout = () => {
    $location.path('/');
  }

  $scope.gifs = [];
  let offset = 0;

  function fetchGifs() {

    let req = {
      offset: offset,
      query: 'chees'
    };

    gify.search(req).then(
      function (res) {
        if (res.status == 200) {
          if (offset > 0)
            $scope.gifs = $scope.gifs.concat(res.data.data);
          else
            $scope.gifs = res.data.data;
          offset = res.data.pagination.offset + res.data.pagination.count;
        } else {
          console.log("Error Occured!");
        }
      },
      function (err) {
        console.log(err);
      }
    );
  }

  $scope.search_gifs = function(s) {
    console.log(s);
  }

  fetchGifs();

}]);
