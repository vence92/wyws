(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('index', {
        url: '/index',
        views: {
          '@': {
            templateUrl: 'src/app/index/index.tpl.html',
            controller: 'IndexCtrl'
          }
        },
        resolve:{
          resetUsers: function(UserFactory) {
            UserFactory.users = null;
            return UserFactory.users;
          }
        }
      });
  }

  /**
   * @name  indexCtrl
   * @description Controller
   */
  function IndexCtrl($scope, $state, $stateParams, $rootScope, ApiConfig, UserFactory) {
    //retrieve API'S in scope
    $scope.api = ApiConfig;
    $scope.getUsers = function(user1, user2, region){
       $state.go('root.compare', {
          region: region,
          user1: user1,
          user2: user2
        }
      );
    }

    $scope.getUser = function(user, region){
      if(user && region){
        $state.go('root.profile',{username : user, region: region});
      }
      else if(!user){
        console.log('Veuillez rentrer un nom de summoner !')
      }
      else if(!region) {
        console.log('Veuillez préciser la région')
      }
    }
  }

  angular.module('index', [])
    .config(config)
    .controller('IndexCtrl', IndexCtrl)
})();
