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
            	api.games = response.data.games;
				return api.games;
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
              return $q.reject(response.data);
		});
}

  	var api = {
  		games : [],
		getRecentGames: getRecentGames
  	}

  	return api;
  }

  angular.module('game', [])
    .factory('GameFactory', GameFactory)
})();