function SearchRatingCtrl($scope, $http, $location, $routeParams) {
  $scope.loggedIn = true;
  $scope.form = {};

  $scope.radio = {model :  undefined};

  getUsers($scope, $http, $location);

  $scope.today = function() {
    $scope.reviewdate = '';
  };
  $scope.today();

  $scope.radioModelButtons = ["A","B","C","D","F"];

  $scope.restaurant = "";
  $scope.radio.model = '';
  $scope.notes = '';
  $scope.reviewer = '';

  if($routeParams.restaurant === undefined){
    getRatings($scope, $http, $location);
  }
  else
  {
    $scope.restaurant = $routeParams.restaurant;
    search($scope, $http, $location);
  }

  $scope.editRow = function(id){
    $location.url('editRating/' + id);
  };

  $scope.deleteRow = function(id){
    $http.defaults.headers.delete = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session };

    $http.delete('/rating/' + id).
      success(function(data) {
        getRatings($scope, $http, $location);
      });
  };

  $scope.reset = function(){
      $scope.restaurant = "";
      $scope.reviewdate = "";
      $scope.radio.model = '';
      $scope.notes = '';
      $scope.reviewer = '';

      getRatings($scope, $http, $location);
  };

  $scope.search = function(){
    search($scope, $http, $location);
  };
}

function search(scope, http, location){
    http.defaults.headers.post = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session, 'Content-Type' : 'application/json' };

    var rating = {};
    rating.restaurant = scope.restaurant;
    rating.reviewdate = scope.reviewdate;
    rating.reviewer = scope.reviewer.username;
    rating.rating = scope.radio.model;
    rating.notes = scope.notes;

    scope.myData = [];

    http.post('/search', JSON.stringify(rating)).
      success(function(data, status, headers, config) {
        scope.myData = data;
      }).
      error(function(data, status, headers, config){
        location.url('/');
      });

      scope.gridOptions = { data : 'myData',
      showGroupPanel: true,
      enableCellSelection: false,
      enableRowSelection: false,
      columnDefs: [{field: 'reviewdate', displayName: 'Review Date', width: '20%'},
              {field: 'notes', displayName: 'Notes', width: '31%'},
              {field: 'rating', displayName: 'Rating', width: '7%'},
              {field: 'restaurant', displayName: 'Restaurant', width: '20%'},
              {field: 'reviewer', displayName: 'Reviewer', width: '10%'},
              {width: '12%', displayName: 'Options', cellTemplate: '<input type="button" name="edit" ng-click=editRow(row.entity.id) value="Edit">&nbsp;<input type="button" ng-click=deleteRow(row.entity.id) name="delete" value="Delete">'}
              ]};

}

function getRatings(scope, http, location){
  scope.myData = [];
    http.get('/ratings').
      success(function(data, status, headers, config) {
        scope.myData = data;
      }).
      error(function(data, status, headers, config) {
        location.url('/');
      });

      scope.gridOptions = { data : 'myData',
      showGroupPanel: true,
      enableCellSelection: false,
      enableRowSelection: false,
      columnDefs: [{field: 'reviewdate', displayName: 'Review Date', width: '20%'},
              {field: 'notes', displayName: 'Notes', width: '31%'},
              {field: 'rating', displayName: 'Rating', width: '7%'},
              {field: 'restaurant', displayName: 'Restaurant', width: '20%'},
              {field: 'reviewer', displayName: 'Reviewer', width: '10%'},
              {width: '12%', displayName: 'Options', cellTemplate: '<input type="button" name="edit" ng-click=editRow(row.entity.id) value="Edit">&nbsp;<input type="button" ng-click=deleteRow(row.entity.id) name="delete" value="Delete">'}
              ]};
}
