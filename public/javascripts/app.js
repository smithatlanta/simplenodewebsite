angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives1', 'myApp.directives2', 'ui.bootstrap.tpls', 'ui.bootstrap.buttons', 'ui.bootstrap.datepicker', 'ngGrid']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/login',
        controller: IndexCtrl
      }).
      when('/addUser', {
        templateUrl: '/partials/addeditUser',
        controller: AddUserCtrl
      }).
      when('/addRating', {
        templateUrl: '/partials/addeditRating',
        controller: AddRatingCtrl
      }).
      when('/editRating/:id', {
        templateUrl: '/partials/addeditRating',
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