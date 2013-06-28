function EditRatingCtrl($scope, $http, $location, $routeParams) {
  $scope.loggedIn = true;
  $scope.loggedOut = false;

  $scope.form = {};

  $scope.type = "Save";

  $scope.radio = {model :  undefined};

  setupLogin($scope, $http);

  $scope.today = function() {
    $scope.reviewdate = new Date();
  };
  $scope.today();

  $scope.radioModelButtons = ["A","B","C","D","F"];

  $http.defaults.headers.get = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session };
  $http.get('/rating/' + $routeParams.id).
    success(function(rating) {
      $scope.id = rating._id;
      $scope.restaurant = rating.restaurant;
      $scope.reviewdate = new Date(rating.reviewdate);
      $scope.radio.model = rating.rating;
      $scope.notes = rating.notes;

      $http.get('/users').
        success(function(data, status, headers, config) {
          $scope.users = data;
          for(var x = 0; x < data.length;x++){
            if(rating.reviewer === data[x].username){
              $scope.reviewer = $scope.users[x];
            }
          }
        }).
        error(function(data, status, headers, config) {
          processError(status, $scope, $http);
        });
    }).
    error(function(data, status, headers, config) {
      processError(status, $scope, $http);
    });


  $scope.submitRating = function () {
    $http.defaults.headers.put = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session, 'Content-Type' : 'application/json' };

    var rating = {};
    rating.id = $scope.id;
    rating.restaurant = $scope.restaurant;
    rating.reviewdate = $scope.reviewdate;
    rating.reviewer = $scope.reviewer.username;
    rating.rating = $scope.radio.model;
    rating.notes = $scope.notes;

    $http.put('/rating', JSON.stringify(rating)).
      success(function(data, status, headers, config) {
        $location.url('/searchRating');
      }).
      error(function(data, status, headers, config){
        processError(status, $scope, $http);
      });
  };

  $scope.cancel = function () {
    $location.url('/searchRating');
  };
}