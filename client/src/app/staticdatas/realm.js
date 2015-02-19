(function() {
  'use strict';

  /**
   * @name  realmFactory
   * @description Factory
   */
  function RealmFactory($http, $q, ApiConfig) {

  	var cfg = ApiConfig.base.staticdatas;


  	//retrieve champion list.
    function getRealm(region) {
    	
    }

  	var api = {
      getRealm: getRealm
  	}

  	return api;
  }

  angular.module('staticdatas')
    .factory('RealmFactory', RealmFactory)
})();
