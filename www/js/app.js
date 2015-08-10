// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'popup', 'pophover', 'pophoverb', 'cat', 'starter.controllers','userModule','postModule', 'tagModule','subscriptionModule', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })
 

   .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'BrowseCtrl'
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.publications', {
    url: "/publications",
    views: {
      'menuContent': {
      templateUrl: "templates/publication.html",
      controller: 'getPostCtrl'
    }
   } 
  })
  .state('app.publicationsSub', {
    url: "/publicationsSub",
    views: {
      'menuContent': {
      templateUrl: "templates/publicationSub.html",
      controller: 'getPostCtrl'
    }
   } 
  })
  .state('app.publication', {
    url: "/publications/:publicationId",
    views: {
        'menuContent': {
          templateUrl: "templates/comments.html",
          controller: 'postCtrl'
      }
    }
  })
   .state('app.haters', {
    url: "/haters",
    views: {
      'menuContent': {
      templateUrl: "templates/haters.html",
      controller: 'TestCtrl'
    }
   } 
  })
   .state('app.preference2', {
    url: "/preference2",
    views: {
      'menuContent': {
      templateUrl: "templates/preference2.html",
      controller: 'TestCtrl'
    }
   } 
  })
      .state('app.login1', {
    url: "/login1",
    views: {
      'menuContent': {
      templateUrl: "templates/login1.html",
      controller: 'TestCtrl'
    }
   } 
  })

   .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
      templateUrl: "templates/profile.html",
      controller: 'TestCtrl'
    }
   } 
  })
   .state('app.inscription', {
    url: "/inscription",
    views: {
      'menuContent': {
      templateUrl: "templates/inscription.html",
      controller: 'TestCtrl'
    }
   } 
  })
   .state('app.parametre', {
    url: "/parametre",
    views: {
      'menuContent': {
      templateUrl: "templates/parametre.html",
      controller: 'TestCtrl'
    }
   } 
  })
   .state('app.navigation', {
    url: "/navigation",
    views: {
      'menuContent': {
      templateUrl: "templates/navigation.html",
      controller: 'TestCtrl'
    }
   } 
  })
   .state('app.pophover', {
    url: "/pophover",
    views: {
      'menuContent': {
      templateUrl: "templates/pophover.html",
      controller: 'PophoverCtrl'
    }
   } 
  })
    .state('app.cat', {
    url: "/cat",
    views: {
      'menuContent': {
      templateUrl: "templates/haters.html",
      controller: 'CatCtrl'
    }
   } 
  })
      .state('app.pophoverb', {
    url: "/pophoverb",
    views: {
      'menuContent': {
      templateUrl: "templates/pophoverb.html",
      controller: 'PophoverCtrl'
    }
   } 
  })
     .state('app.comments', {
    url: "/comments",
    views: {
      'menuContent': {
      templateUrl: "templates/comments.html",
      controller: 'PophoverCtrl'
    }
   } 
  })
  .state('app.profil', {
    url: "/profil",
    views: {
      'menuContent': {
      templateUrl: "templates/profil.html",
      controller: 'TestCtrl'
    }
   } 
  })
  ;

  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/haters');

});
