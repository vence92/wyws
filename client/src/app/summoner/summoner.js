(function() {
  'use strict';

  /**
   * @name  SummonerFactory
   * @description Factory
   */
  function SummonerFactory($http, $rootScope, $q, ApiConfig) {

  	var cfg = ApiConfig.base.summoner;

    function getUser(username, region) {
      username = angular.lowercase(username);
      return $http.get(ApiConfig.COMMON_URL + region + cfg.version + cfg.label + 'by-name/' + username + ApiConfig.API_KEY).then(function(response){
        if (response.data && response.status === 200) {
          api.user = response.data[username];
          api.user.region = region;
          $rootScope.user = api.user;
          return api.user;
        }
        else {
          return $q.reject(response.data);
        }
      });
    }

    function getMasteries(userId, region) {
      return $http.get(ApiConfig.COMMON_URL + region + cfg.version + cfg.label + userId + '/masteries' + ApiConfig.API_KEY).then(function(response){
        return api.masteries = response.data[userId].pages;
      })
    }

    function getRunes(userId, region) {
      return $http.get(ApiConfig.COMMON_URL + region + cfg.version + cfg.label + userId + '/runes' + ApiConfig.API_KEY).then(function(response){
        return api.runes = response.data[userId].pages;
      })
    }


  	var api = {
      getUser: getUser,
      getMasteries: getMasteries,
      getRunes: getRunes
  	}

  	return api;
  }

  angular.module('summoner', [])
    .factory('SummonerFactory', SummonerFactory)
})();
