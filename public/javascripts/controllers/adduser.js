function AddUserCtrl($scope, $http, $location) {
  $scope.form = {};

  $scope.submitUser = function () {
  $http.post('/user', $scope.form).
    success(function(data) {
      console.log(data);
      $location.url('/');
    });
  };
}