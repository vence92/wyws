(function() {
  'use strict';

  /**
   * @name  statsCtrl
   * @description Controller
   */
  function StatsFactory($http, $q, ApiConfig) {

  	var cfg = ApiConfig.base.stats;

    function getRankedStats(region, id) {
      return $http.get(ApiConfig.COMMON_URL + region + cfg.version + cfg.label + 'by-summoner/' + id + '/ranked' + ApiConfig.API_KEY)
        .then(function(response) {
            if (typeof response.data === 'object') {
              console.log(response.data);
              return response.data;
            } else {
              return $q.reject(response.data);
            }
          }, function(response) {
              return $q.reject(response.data);
          });
    }


    function getSummaryStats(region, id) {
      return $http.get(ApiConfig.COMMON_URL + region + cfg.version + cfg.label + 'by-summoner/' + id + '/summary' + ApiConfig.API_KEY)
        .then(function(response){
          if (typeof response.data === 'object') {
            return response.data;
          } else {
            return $q.reject(response.data);
          }
        }, function(response) {
            return $q.reject(response.data)
        });
    }

  	var api = {
      getRankedStats: getRankedStats,
      getSummaryStats: getSummaryStats
  	}

  	return api;
  }

  angular.module('stats', [])
    .factory('StatsFactory', StatsFactory)
})();
