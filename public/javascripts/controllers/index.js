function IndexCtrl($scope, $http, $location) {
  $scope.loggedIn = false;
  localStorage.clear();

  $scope.submitLogin = function () {
    if($scope.form === undefined){
      $scope.message = "Please enter a username and password";
      return;
    }

    if($scope.form.password === undefined){
      $scope.message = "Please enter a password";
      return;
    }

    localStorage.username = $scope.form.username;
    localStorage.password = $scope.form.password;

    $http.defaults.headers.post = {'Authorization' : localStorage.username + ":" + localStorage.password};

    $http.post('/signin', $scope.form).
      success(function(data, status, headers, config) {
        localStorage.username = data.username;
        localStorage.password = data.password;
        localStorage.session = data.session;
        $location.url('/addRating');
      }).
      error(function(data, status, headers, config){
        $scope.message = "Incorrect username or password. Please try again.";
      });
    };
}