var myApp = angular.module('postModule');

myApp.controller('upVoteCtrl', ['$scope', '$window' , '$http' , function($scope, $window, $http){
    
    $scope.upVotePost = function(postId){
    	var user = JSON.parse($window.sessionStorage.getItem('user'));
	    $http
	    .post("http://localhost:1337/post/upVotePost", {postId: postId, userId: user.id})
	    .success(function (data, status, headers, config) {
	      console.log(data);
	    })
	    .error(function (data, status, headers, config) {
	    });
	};

	$scope.upVoteComment = function(postId, commentId){
    	var user = JSON.parse($window.sessionStorage.getItem('user'));
	    $http
	    .post("http://localhost:1337/comment/upVoteComment", {postId: postId, userId: user.id,commentId: commentId})
	    .success(function (data, status, headers, config) {
	      console.log(data);
	    })
	    .error(function (data, status, headers, config) {
	    });
	};
    
}]);