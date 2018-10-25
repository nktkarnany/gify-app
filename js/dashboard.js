var gifyApp = angular.module('gifyApp');

gifyApp.controller('dashboardCtrl', ['$scope', 'gify', '$timeout', '$location', function ($scope, gify, $timeout, $location) {

  $scope.gifs = [];
  let offset = 0;

  function fetchGifs() {

    let req = {
      offset: offset,
      query: $scope.search_gif
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

  fetchGifs();

  $scope.logout = () => {
    $location.path('/');
  }

}]);
