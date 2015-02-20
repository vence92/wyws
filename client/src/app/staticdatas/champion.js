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
    	if (!api.champions.length > 0 ) {
    		console.log('here')
    		return $http.get(ApiConfig.GLOBAL_URL + cfg.label + region + cfg.version + '/champion?champData=info' + cfg.key)
	        .then(function(response) {
	            if (typeof response.data === 'object') {
	            	api.champions = response.data.data;
	            	var championsTmp = [];
	            	angular.forEach(api.champions, function(champion){
	            		championsTmp[champion.id] = champion;
	            	})
	            	api.champions = championsTmp;
					return api.champions;
	            } else {
	              return $q.reject(response.data);
	            }
	      	}, function(response) {
	          	return $q.reject(response.data);
			});
    	}
    }

   	function getChampionById(region,id){
   		return $http.get(ApiConfig.GLOBAL_URL + cfg.label + region + cfg.version + '/champion/' + id + '?champData=all' + cfg.key)
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
  		champions : [],
		getChampionList: getChampionList,
		getChampionById: getChampionById
  	}

  	return api;
  }



  function convertIdToName(ChampionFactory, $stateParams){
  	return function(id) {
  		var champions = ChampionFactory.champions[id];
  		return champions.name;
  	};
  }

  angular.module('champion',[])
    .factory('ChampionFactory', ChampionFactory)
    .filter('convertIdToName', convertIdToName)
})();
