(function() {
  'use strict';

  /**
   * @name  itemFactory
   * @description Factory
   */
  function ItemFactory($http, $q, ApiConfig) {

  	var cfg = ApiConfig.base.staticdatas;


  	//retrieve champion list.
    function getItemList(region) {
		
    }

  	var api = {
      getItemList: getItemList
  	}

  	return api;
  }

  angular.module('item',[])
    .factory('ItemFactory', ItemFactory)
})();
