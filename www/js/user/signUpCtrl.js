angular.module('userModule')
.controller('SignUpCtrl', ['$scope', '$http', '$window', '$location' , function($scope, $http, $window, $location) {
	$scope.createUserForm = function(){
        var uploadUrl = "http://localhost:1337/user/create";
        $http.post(uploadUrl, {
            Pseudo: $scope.signUp.pseudo ,
            Password: $scope.signUp.password, 
            Email: $scope.signUp.email
        })
        .success(function(data, status, headers, config){
        	$scope.signUp.pseudo = '';
        	$scope.signUp.password = '';
        	$scope.signUp.confirm = '';
        	$scope.signUp.email = '';
        	$window.sessionStorage.token = data.token;
            $window.sessionStorage.isAuthenticated = true;
            $window.sessionStorage.user =JSON.stringify(data.user);
            $location.path("/app/publications");
            $window.location.reload(true)
        })
        .error(function(){
        });
    };
}]);