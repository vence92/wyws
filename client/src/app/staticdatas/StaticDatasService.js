(function() {
  'use strict';

  /**
   * @name  StaticDatasFactory
   * @description Factory
   */
  function StaticDatasFactory($http, $q, ApiConfig) {

    var cfg = ApiConfig.base.staticdatas;


// CHAMPIONS

    // getChampionsList
    // @params: region
    function getChampionsList(region) {
        if (!api.champions.length > 0 ) {
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


    // getChampionById
    // @params: region, id
    function getChampionById(region, id){
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
    




// ITEMS
    
    // getItems
    // @params: region
    function getItems(region) {
        return '';
    }

// MASTERIES
    
    // getItems
    // @params: region
    function getMasteries(region) {
        return '';
    }

// RUNES
    
    // getRunes
    // @params: region
    function getRunes(region) {
        
    }

// REALM
    
    // getRealm
    // @params: region
    function getRealm(region) {
        
    }


// SPELLS
    
    // getSpells
    // @params: region
    function getSpells(region) {
        
    }






    var api = {
        champions : [],
        getChampionsList: getChampionsList,
        getChampionById: getChampionById,
        getItems: getItems,
        getRunes: getRunes,
        getMasteries: getMasteries,
        getRealm: getRealm,
        getSpells: getSpells
    }

    return api;
  }



  function convertIdToName(StaticDatasFactory, $stateParams){
    return function(id) {
        var champions = ChampionFactory.champions[id];
        return champions.name;
    };
  }

  angular.module('staticdatas',[])
    .factory('StaticDatasFactory', StaticDatasFactory)
    .filter('convertIdToName', convertIdToName)
})();
