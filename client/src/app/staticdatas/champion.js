(function() {
  'use strict';

  /**
   * @name  championFactory
   * @description Factory
   */
  function ChampionFactory($http, $q, ApiConfig) {

  	var cfg = ApiConfig.base.staticdatas;


  	//retrieve champion list.
    function getChampionList(region) {
		return $http.get(ApiConfig.GLOBAL_URL + cfg.label + region + cfg.version + '/champion?champData=info' + cfg.key)
        .then(function(response) {
            if (typeof response.data === 'object') {
              return response.data;
            } else {
              return $q.reject(response.data);
            }
      	}, function(response) {
          	return $q.reject(response.data);
		});
    }

  	var api = {
      getChampionList: getChampionList
  	}

  	return api;
  }

  angular.module('champion',[])
    .factory('ChampionFactory', ChampionFactory)
})();
