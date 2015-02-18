(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.profile', {
        url: '/:region/profile/:username/',
        views: {
          '@': {
            templateUrl: 'src/app/profile/profile.tpl.html',
            controller: 'ProfileCtrl'
          }
        },
        resolve: {
          resolveUser: function($stateParams, SummonerFactory) {
            console.log($stateParams)
            return SummonerFactory.getUser($stateParams.username, $stateParams.region);
          }
        }
      });
  }

  /**
   * @name  loginCtrl
   * @description Controller
   */
  function ProfileCtrl($scope, $stateParams, SummonerFactory, ObserverFactory) {

    //toImprove
    $scope.user.masteries = SummonerFactory.getMasteries($scope.user.id, $stateParams.region);
    $scope.user.runes = SummonerFactory.getRunes($scope.user.id, $stateParams.region);

  }

  function ProfileFactory(SummonerFactory) {

    var api = {
      
    }
    return api;
  }


  angular.module('profile', [])
    .config(config)
    .controller('ProfileCtrl', ProfileCtrl)
    .controller('ProfileFactory', ProfileFactory)
})();
