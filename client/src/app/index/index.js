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
        }
      });
  }



  /**
   * @name  indexCtrl
   * @description Controller
   */
  function IndexCtrl($scope, $state, $stateParams, $rootScope, ApiConfig, SummonerFactory) {
    //retrieve API'S in scope
    $scope.api = ApiConfig;

    $scope.connect = function(){
      if($scope.username && $scope.region){
        SummonerFactory.getUser($scope.username, $scope.region).then(function(data){
          $state.go('root.profile',{username : $scope.username, region: $scope.region});
        })
      }
      else if(!$scope.username){
        console.log('Veuillez rentrer un nom de summoner !')
      }
      else if(!$scope.region) {
        console.log('Veuillez préciser la région')
      }
    }
  }

  angular.module('index', [])
    .config(config)
    .controller('IndexCtrl', IndexCtrl)
})();
