var gifyApp = angular.module('gifyApp');

gifyApp.controller('dashboardCtrl', ['$scope', 'gify', '$timeout', '$location', function ($scope, gify, $timeout, $location) {

  // Declaring and Initializing an empty gifs array
  $scope.gifs = [];

  // Declaring and Initializing an offset to fetch new gifs on load more
  let offset = 0;

  // Declaring and Initializing a variable to save loading state of the loader
  $scope.loading = false;

  // Method to fetch gifs and populate the gifs array
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

  // method called when search button is clicked
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

  // checking search query in url is available setting it to the search string
  let queryStr = $location.search().q;
  if (queryStr) {
    $scope.search_gif = queryStr;
  }

  // button to fetch more gifs
  $scope.load_more = function() {
    fetchGifs();
  }

  // init call to fetch gifs when page is loaded
  fetchGifs();

  // a hypothetical logout method which redirects back to the login page
  $scope.logout = () => {
    $location.path('/');
  }

}]);
