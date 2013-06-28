function AddUserCtrl($scope, $http, $location) {
  $scope.loggedIn = false;
  $scope.loggedOut = true;

  $scope.form = {};

  $scope.submitUser = function () {
    $http.defaults.headers.post = {'Content-Type' : 'application/json' };
    $http.post('/user', $scope.form).
      success(function(data, status, headers, config) {
        $location.url('/');
      }).
      error(function(data, status, headers, config){
        processError(status, $scope, $http);
      });
  };
}