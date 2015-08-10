angular.module('popup', ['ionic'])
.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {
$scope.search = false;
 // Triggered on a button click, or some other target
 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="" placeholder="ecrire ici..">',
     title: 'Publier un article',
     subTitle: 'Lache toi',
     scope: $scope,
     buttons: [
       { text: 'Quitter' },
       {
         text: '<b>Publier</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 3000);
  };
  
   // A confirm dialog

   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Rechercher',
       template: '<input type="text" height="190px" placeholder="Lancez votre recherche..."  />'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('Annuler');
       } else {
         console.log('Publier');
       }
     });
   };

   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };

   $scope.toggleSearch = function () {
    console.log($scope.search);
     $scope.search = $scope.search === false ? true: false;
   }
});


