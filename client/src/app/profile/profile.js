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
            return SummonerFactory.getUser($stateParams.username, $stateParams.region);
          }
        }
      });
  }

  /**
   * @name  profileCtrl
   * @description Controller
   */
  function ProfileCtrl($scope, $stateParams, ProfileFactory, ChampionFactory) {
    $scope.userProfile = ProfileFactory.getProfileUserObj();
    ChampionFactory.getChampionList($scope.user.region).then(function(data){
      $scope.champions = data;
      console.log($scope.champions);
    })
  }

  /**
   * @name  profileFactory
   * @description Factory
   */
  function ProfileFactory($q, $stateParams, SummonerFactory, GameFactory) {


    // Build custom user object for profile view.
    function getProfileUserObj() {

      api = SummonerFactory.user;

      var userId = SummonerFactory.user.id,
          region = SummonerFactory.user.region;

      $q.all([
            SummonerFactory.getRunes(userId, region),
              SummonerFactory.getMasteries(userId, region),
                GameFactory.getRecentGames(region, userId)
      ])
      .then(function(results){
        api.runes = results[0];
        api.masteries = results[1];
        api.recentGames = results[2];
      })
      return api;
    }

    var api = {
      getProfileUserObj: getProfileUserObj
    }

    return api;
  }


  angular.module('profile', [])
    .config(config)
    .controller('ProfileCtrl', ProfileCtrl)
    .factory('ProfileFactory', ProfileFactory)
})();
