// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

.config(function($stateProvider, $urlRouterProvider) {

      $stateProvider.state('home', {
        url:'/home',
        templateUrl:'templates/home.html',
        
        })
      $stateProvider.state('about',{
        url:'/about',
        templateUrl:'templates/about.html',
      })
      $stateProvider.state('register', {
        url:'/register',
        templateUrl:'templates/register.html'
      })
      $stateProvider.state('connexion', {
        url:'/connexion',
        templateUrl:'templates/connexion.html'
      })
      $stateProvider.state('category', {
        url:'/category',
        templateUrl:'templates/category.html'
      })
      $stateProvider.state('search', {
        url:'/search',
        templateUrl:'templates/search.html'
      })
      $stateProvider.state('connect', {
        url:'/connect',
        templateUrl:'templates/connect.html'
      })
    $stateProvider.state('configuration', {
        url:'/configuration',
        templateUrl:'templates/configuration.html'
    })
    $stateProvider.state('account', {
        url:'/account',
        templateUrl:'templates/account.html'
    })
    $stateProvider.state('profil', {
        url:'/profil',
        templateUrl:'templates/profil.html'
    })
    $stateProvider.state('picture', {
        url:'/picture',
        templateUrl:'templates/picture.html'
    })



      $urlRouterProvider.otherwise('/home')



  });

function takePicture() {
  navigator.camera.getPicture(function(imageURI) {

    // imageURI is the URL of the image that we can use for
    // an <img> element or backgroundImage.

  }, function(err) {

    // Ruh-roh, something bad happened

  }, cameraOptions);
}
module.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
.controller('MyCtrl', function($scope, Camera) {

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };

