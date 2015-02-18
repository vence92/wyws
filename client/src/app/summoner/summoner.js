(function() {
  'use strict';

  /**
   * @name  loginCtrl
   * @description Controller
   */
  function SummonerFactory($http, $rootScope, ApiConfig) {

  	var cfg = ApiConfig.base.summoner;

    function getUser(username, region) {
      return $http.get(ApiConfig.COMMON_URL + region + cfg.version + cfg.label + 'by-name/' + username + ApiConfig.API_KEY).then(function(response){
        if (response && response.status === 200) {
          api.user = response.data[username];
          api.user.region = region;
          $rootScope.user = api.user;
          return api.user;
        }
        else {
          $q.reject('Nom introuvable pour cette région');
        }
      });
    }

    function getMasteries(userId, region) {
      return $http.get(ApiConfig.COMMON_URL + region + cfg.version + cfg.label + userId + '/masteries' + ApiConfig.API_KEY).then(function(response){
        api.user.masteries = response.data[userId].pages;
      })
    }

    function getRunes(userId, region) {
      return $http.get(ApiConfig.COMMON_URL + region + cfg.version + cfg.label + userId + '/runes' + ApiConfig.API_KEY).then(function(response){
        api.user.runes = response.data[userId].pages;
      })
    }


  	var api = {
      user: null,
      getUser: getUser,
      getMasteries: getMasteries,
      getRunes: getRunes
  	}

  	return api;
  }

  angular.module('summoner', [])
    .factory('SummonerFactory', SummonerFactory)
})();
