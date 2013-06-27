function AddRatingCtrl($scope, $http, $location) {
  $scope.loggedIn = true;
  $scope.loggedOut = false;

  $scope.form = {};

  $scope.type = "Add";

  $scope.radio = {model :  undefined};

  getUsers($scope, $http, $location);

  $scope.today = function() {
    $scope.reviewdate = new Date();
  };
  $scope.today();

  $scope.radioModelButtons = ["A","B","C","D","F"];

  $scope.submitRating = function () {
    $http.defaults.headers.post = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session, 'Content-Type' : 'application/json' };

    var rating = {};
    rating.restaurant = $scope.restaurant;
    rating.reviewdate = $scope.reviewdate;
    rating.reviewer = $scope.reviewer.username;
    rating.rating = $scope.radio.model;
    rating.notes = $scope.notes;

    $http.post('/rating', JSON.stringify(rating)).
      success(function(data, status, headers, config) {
        $location.url('/searchRating');
      }).
      error(function(data, status, headers, config){
        $location.url('/');
      });
  };

  $scope.cancel = function () {
    $location.url('/searchRating');
  };
}