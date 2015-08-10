var myApp = angular.module('postModule');

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http','$q','$window' , function ($http,$q,$window) {
    this.uploadFileToUrl = function(file, uploadUrl,data,user){
                  console.log($scope.posts)
        var fd = new FormData();
        fd.append('Text', data.postText);
        fd.append('Tags', data.postTags);
        fd.append('Title', data.postTitle);
        fd.append('COMMENT_USER_PSEUDO', user.Pseudo);
        fd.append('COMMENT_USER_AVATAR', user.AvatarUrl);
        if (data.postText && data.postTags && data.postTitle) {
           fd.append('Pictures', file); 
        }    
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            var postsDeferred = $q.defer();
              console.log($window.sessionStorage.token);
              // return $resource('http://localhost\\:1337/post/findLast');
              var user = JSON.parse($window.sessionStorage.getItem('user'));
              $http
                .post('http://localhost\:1337/post/findLast', { token: $window.sessionStorage.token
                 })
                 .success(function (data,status) {
                  console.log(data)
                  console.log(postsDeferred.resolve(data))
                  return data;
                 });
        })
        .error(function(){
        });
    };
}]);

myApp.controller('createPostCtrl', ['$q','$http','$scope','$rootScope','$ionicSlideBoxDelegate', 'fileUpload', '$window' , '$timeout', function($q,$http,$scope,$rootScope,$ionicSlideBoxDelegate, fileUpload, $window, $timeout){
    
    $scope.submitPostForm = function(){
        console.log( $rootScope.posts);
        console.log( $window.sessionStorage.token);
        var file = $scope.data.postPictures;
        var uploadUrl = "http://localhost:1337/post/create?token="+$window.sessionStorage.token;
        var user = JSON.parse($window.sessionStorage.getItem('user'));
        // $scope.post = fileUpload.uploadFileToUrl(file, uploadUrl,$scope.data,user);
        var fd = new FormData();
        fd.append('Text', $scope.data.postText);
        fd.append('Tags', $scope.data.postTags);
        fd.append('Title', $scope.data.postTitle);
        fd.append('COMMENT_USER_PSEUDO', user.Pseudo);
        fd.append('COMMENT_USER_AVATAR', user.AvatarUrl);
        if ($scope.data.postText && $scope.data.postTags && $scope.data.postTitle) {
           fd.append('Pictures', file); 
        }    
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            var postsDeferred = $q.defer();
              console.log($window.sessionStorage.token);
              // return $resource('http://localhost\\:1337/post/findLast');
              var user = JSON.parse($window.sessionStorage.getItem('user'));
              $http
                .post('http://localhost\:1337/post/findLast', { token: $window.sessionStorage.token
                 })
                 .success(function (data,status) {
                  $timeout(function () {
                     console.log(data)
                  $rootScope.posts = data;
                  console.log($rootScope.posts)
                   $ionicSlideBoxDelegate.$getByHandle('post-slide').update();
                  },3000);
                 });
        })
        .error(function(){
        });
            $scope.data.postText = '';
            $scope.data.postTags = '';
            $scope.data.postTitle = '';
            // $scope.$apply();
    };
    
}]);
