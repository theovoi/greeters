// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var module = angular.module('starter', ['ionic'])


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
module.controller('MyCtrl', function($scope, Camera) {

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };

});




    module.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
    	console.log("map")
      function initialize() {
      	console.log("initialize")
        var myLatlng = new google.maps.LatLng(48.858285,2.294449);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      //google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.$on('$ionicView.afterEnter', function(){
      	initialize();
      });
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
    });

