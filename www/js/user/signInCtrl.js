angular.module('userModule')
.controller('SignInCtrl', ['$scope', '$http', '$window', '$location' , function($scope, $http, $window, $location) {
  $scope.logUserForm = function(){
    $http
    .post("http://localhost:1337/session/logIn", {Email: $scope.signIn.email, Password: $scope.signIn.password})
    .success(function (data, status, headers, config) {
      $window.sessionStorage.token = data.token;
      $window.sessionStorage.isAuthenticated = true;
      $window.sessionStorage.user =JSON.stringify(data.user);
      $scope.modal.hide();
      $location.path("/app/publications");
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