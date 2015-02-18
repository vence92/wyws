(function() {
  'use strict';

  /**
   * @name  loginCtrl
   * @description Controller
   */
  function ObserverFactory($http, $filter, ApiConfig) {

  	var cfg = ApiConfig.observer;

 	function getObserver(region, id){
 		region = $filter('regionFilter')(region);

 		$http.get(ApiConfig.OBSERVER_URL + cfg.urlnext + region + '/' + id + ApiConfig.API_KEY).
 		success(function(data) {
 			console.log('success')
	  	}).
	  	error(function(data){
	  		console.log('fail')
	  	});
 	}

  	var api = {
      getObserver: getObserver
  	}

  	return api;
  }

  function regionFilter(){
  	return function(region) {
  		var regions = {
  			'euw': 'EUW1',
  			'eune': 'EUN1',
  			'br': 'BR1',
  			'kr': 'KR',
  			'lan': 'LA1',
  			'las': 'LA2',
  			'na': 'NA1',
  			'oce': 'OC1',
  			'ru': 'RU',
  			'tr': 'TR1'
  		}
    	return regions[region]
  	};
  }

  angular.module('observer', [])
    .factory('ObserverFactory', ObserverFactory)
    .filter('regionFilter', regionFilter)
})();
