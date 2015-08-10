var myApp = angular.module('userModule');

myApp.controller('profileCtrl',function($scope,$window,$http){
        $scope.user = JSON.parse($window.sessionStorage.getItem('user'));
        console.log($scope.user)
   
});