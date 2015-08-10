var myApp = angular.module('subscriptionModule');

myApp.controller('subscriptionCtrl',function($scope,$window,$http){
    $scope.subscribe = function(providerPseudo){
        var user = JSON.parse($window.sessionStorage.getItem('user'));
        $http
        .post("http://localhost:1337/subcription/add", {providerPseudo: providerPseudo, userId: user.id})
        .success(function (data, status, headers, config) {
          console.log(data);
        })
        .error(function (data, status, headers, config) {
        });
    };
});