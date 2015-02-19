(function() {
  'use strict';

  /**
   * @name  gameFactory
   * @description Factory
   */
  function GameFactory($http, $q, ApiConfig) {

  	var cfg = ApiConfig.base.game;

    function getRecentGames(region, id) {
		return $http.get(ApiConfig.COMMON_URL + region + cfg.version + cfg.label + 'by-summoner/' + id + '/recent' + ApiConfig.API_KEY)
        .then(function(response) {
            if (typeof response.data === 'object') {
              return response.data.games;
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
              return $q.reject(response.data);
		});
    }

  	var api = {
      getRecentGames: getRecentGames
  	}

  	return api;
  }

  angular.module('game', [])
    .factory('GameFactory', GameFactory)
})();