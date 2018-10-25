var gifyApp = angular.module('gifyApp');

gifyApp.controller('dashboardCtrl', ['$scope', 'gify', '$timeout', '$location', function ($scope, gify, $timeout, $location) {

  $scope.gifs = [];
  let offset = 0;
  $scope.loading = false;

  function fetchGifs() {

    let req = {
      offset: offset,
      query: $scope.search_gif
    };

    $scope.loading = true;

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
        $scope.loading = false;
      },
      function (err) {
        console.log(err);
        $scope.loading = false;
      }
    );
  }

  $scope.search_gifs = function (s) {
    if (s) {
      s = s.toLowerCase();
      var reg = /^[A-Za-z\d\s]+$/;
      if (reg.test(s)) {
        $location.search('q', s);
      } else {
        $location.url($location.path());
      }
    } else {
      $location.url($location.path());
    }
  }

  let queryStr = $location.search().q;
  if (queryStr) {
    $scope.search_gif = queryStr;
  }

  $scope.load_more = function() {
    fetchGifs();
  }

  fetchGifs();

  $scope.logout = () => {
    $location.path('/');
  }

}]);
