var myApp = angular.module('tagModule');

myApp.factory('Tags', function ($http, $q, $window) {
	var postsDeferred = $q.defer();
	console.log($window.sessionStorage.token);
	// return $resource('http://localhost\\:1337/post/findLast');
	$http
    .get('http://localhost\:1337/tag/find?token='+$window.sessionStorage.token, {
     })
     .success(function (data,status) {
     	postsDeferred.resolve(data);
     });
     
     return postsDeferred.promise;
});

myApp.controller('getTagCtrl',function($scope, Tags){
    console.log("fdgfdfddvdf");
  Tags
  .then(function(data) {
        console.log(data);
        $scope.tags = data;
    }, function(error) {
        console.log('My first promise failed', error);
    });
});