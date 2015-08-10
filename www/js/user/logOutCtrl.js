angular.module('userModule')
.controller('logOutCtrl', ['$scope', '$http', '$window', '$location' , function($scope, $http, $window, $location) {
  $scope.logOutUser = function(){
    var user = JSON.parse($window.sessionStorage.getItem('user'));
    $http
    .post("http://localhost:1337/session/logOut", {userId: user.userId})
    .success(function (data, status, headers, config) {
      delete $window.sessionStorage.token;
      delete $window.sessionStorage.isAuthenticated;
      delete $window.sessionStorage.user;
      $location.path("/haters");
      $window.location.reload(true)
    })
    .error(function (data, status, headers, config) {
      // Erase the token if the user fails to log in
      delete $window.sessionStorage.token;
 
      // Handle login errors here
      $scope.message = 'Error: Invalid user or password';
    });
 };
}]);