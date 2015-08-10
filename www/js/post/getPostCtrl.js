var myApp = angular.module('postModule');
myApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
       // config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  }
});

myApp.directive('dynamicSlides', function() {
    return {
        require: ['^ionSlideBox'],
        link: function(scope, elem, attrs, slider) {
            scope.$watch(function() {
                return scope.$eval(attrs.dynamicSlides).length;
            }, function(val) {
                slider[0].__slider.update();
            });
        }
    };
});

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

myApp.factory('PostsSub', function ($http, $q, $window) {
	var postsDeferred = $q.defer();
	console.log($window.sessionStorage.token);
	// return $resource('http://localhost\\:1337/post/findLast');
  var user = JSON.parse($window.sessionStorage.getItem('user'));
	$http
    .post('http://localhost\:1337/post/findSubLast', { token: $window.sessionStorage.token ,subscriptions: user.Subscriptions
     })
     .success(function (data,status) {
     	postsDeferred.resolve(data);
     });
     
     return postsDeferred.promise;
});

myApp.factory('Posts', function ($http, $q, $window) {
  var postsDeferred = $q.defer();
  console.log($window.sessionStorage.token);
  // return $resource('http://localhost\\:1337/post/findLast');
  var user = JSON.parse($window.sessionStorage.getItem('user'));
  $http
    .post('http://localhost\:1337/post/findLast', { token: $window.sessionStorage.token
     })
     .success(function (data,status) {
      postsDeferred.resolve(data);
     });
     
     return postsDeferred.promise;
});

myApp.controller('getPostCtrl',function($scope, $rootScope, Posts, PostsSub, $ionicSlideBoxDelegate,$window){

  var user = JSON.parse($window.sessionStorage.getItem('user'));

  $scope.url = user.AvatarUrl;

  $scope.PicturesArray = function(data) {
    return angular.isArray(data);
  };

  $scope.PicturesString = function(data) {
    //console.log(data);
    return angular.isString(data) && data[0] != undefined;
  };

  Posts
  .then(function(data) {
        console.log(data);
        $rootScope.posts= data;
        $ionicSlideBoxDelegate.update();
    }, function(error) {
        console.log('My first promise failed', error);
    });

  PostsSub
  .then(function(data) {
        console.log(data);
        $scope.postsSub = data;
        $ionicSlideBoxDelegate.update();
    }, function(error) {
        console.log('My first promise failed', error);
    });
});

myApp.controller('postCtrl', function($scope, $rootScope, $stateParams, $http, $q, $window) {
    var postId = $stateParams.publicationId;
    if (postId) {
      var postDeferred = $q.defer();
    // return $resource('http://localhost\\:1337/post/findLast');
    $http
      .get('http://localhost\:1337/post/find?token='+$window.sessionStorage.token+'&postId='+postId, {
       })
       .success(function (data,status) {
        postDeferred.resolve(data);
       });
     postDeferred.promise
                     .then(function(data) {
                          console.log('My first promise failed', data);
                          $rootScope.post = data;
                      }, function(error) {
                          console.log('My first promise failed', error);
                      });
    };

    $scope.createComment = function(postId){
      console.log($rootScope.post);
      var user = JSON.parse($window.sessionStorage.getItem('user'));
      $http
      .post("http://localhost:1337/comment/create", {postId: postId, COMMENT_USER_PSEUDO: user.Pseudo, COMMENT_USER_AVATAR: user.AvatarUrl ,Text: $scope.data.commentText})
      .success(function (data, status, headers, config) {
        console.log(data);
        $rootScope.post = data;
        $scope.data.commentText = '';
      })
      .error(function (data, status, headers, config) {
      });
  };
});