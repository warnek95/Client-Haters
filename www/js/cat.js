angular.module('cat', ['ionic'])

.controller('CatCtrl', function($scope) {
  $scope.array = ['orange', 'blue', 'green'];
  
  $scope.oneToTwo = function(){
    $scope.array = ionic.Utils.arrayMove($scope.array, 0, 1);
  }
  
  $scope.oneToThree = function(){
    $scope.array = ionic.Utils.arrayMove($scope.array, 0, 2);
  }
  
 
})

.directive('debug', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            expression: '=val'
        },
        template: '<pre ng-transclude>{{debug(expression)}}</pre>',
        link: function (scope) {
            scope.debug = function (exp) {
                return angular.toJson(exp, true);
            };
        }
    };
});