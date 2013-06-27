angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives1', 'myApp.directives2', 'ui.bootstrap.tpls', 'ui.bootstrap.buttons', 'ui.bootstrap.datepicker', 'ngGrid']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/login',
        controller: IndexCtrl
      }).
      when('/addUser', {
        templateUrl: '/partials/addUser',
        controller: AddUserCtrl
      }).
      when('/addRating', {
        templateUrl: '/partials/addRating',
        controller: AddRatingCtrl
      }).
      when('/editRating/:id', {
        templateUrl: '/partials/editRating',
        controller: EditRatingCtrl
      }).
      when('/searchRating', {
        templateUrl: '/partials/searchRating',
        controller: SearchRatingCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
   $locationProvider.html5Mode(true);
  }]);