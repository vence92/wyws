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
  function ProfileCtrl($scope, $stateParams, ProfileFactory, SummonerFactory) {
    $scope.userProfile = ProfileFactory.getProfileUserObj(SummonerFactory.user);
  }

  /**
   * @name  profileFactory
   * @description Factory
   */
  function ProfileFactory($q, $stateParams, SummonerFactory, GameFactory, ChampionFactory) {

    // Build custom user object for profile view.
    function getProfileUserObj(user) {
      if (user) {
        $q.all({
          masteries: SummonerFactory.getMasteries(user.id, user.region),
          runes: SummonerFactory.getRunes(user.id, user.region),
          recentGames: GameFactory.getRecentGames(user.region, user.id)
        })
        .then(function(results){
          angular.extend(api.userProfile, user, results);
        })
        return api.userProfile;
      }
    }

    var api = {
      userProfile : {},
      getProfileUserObj: getProfileUserObj
    }

    return api;
  }


  angular.module('profile', [])
    .config(config)
    .controller('ProfileCtrl', ProfileCtrl)
    .factory('ProfileFactory', ProfileFactory)
})();
