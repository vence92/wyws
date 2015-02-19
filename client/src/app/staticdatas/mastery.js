(function() {
  'use strict';

  /**
   * @name  masteryFactory
   * @description Factory
   */
  function MasteryFactory($http, $q, ApiConfig) {

  	var cfg = ApiConfig.base.staticdatas;


  	//retrieve champion list.
    function getMasteryList(region) {
		
    }

  	var api = {
      getMasteryList: getMasteryList
  	}

  	return api;
  }

  angular.module('staticdatas')
    .factory('MasteryFactory', MasteryFactory)
})();
