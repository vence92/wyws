(function() {
  'use strict';

  /**
   * @name  UserFactory
   * @description Factory
   */
  function UserFactory($http, $q, ApiConfig) {

    var config = ApiConfig;


// USER
// URL: config.base.summoner

    // getUser
    // @params: username, region
    function getUser(username, region) {
        username = angular.lowercase(username);
        return $http.get(config.COMMON_URL + region + config.base.summoner.version + config.base.summoner.label + 'by-name/' + username + config.API_KEY)
            .then(function(response){
                if (response.data && response.status === 200) {
                    api.users.push(response.data);
                    return response;
                } else {
                    return $q.reject(response.data);
                }
            }
        );
    }

    // getUser
    // @params: username1, username2, region
    function getUsers(username1, username2, region) {
        return $http.get(config.COMMON_URL + region + config.base.summoner.version + config.base.summoner.label + 'by-name/' + username1 + ',' + username2 + config.API_KEY)
            .then(function(response){
                console.log(response)
                if (response.data && response.status === 200) {
                    api.users.push(response.data);
                    console.log(api.users)
                    return response;
                } else {
                    return $q.reject(response.data);
                }
            }
        );
    }

    // getUserMasteries
    // @params: id, region
    function getUserMasteries(id, region) {
        return $http.get(config.COMMON_URL + region + config.base.summoner.version + config.base.summoner.label + id + '/masteries' + config.API_KEY).then(function(response){
            return api.masteries = response.data[id].pages;
        })
    }

    // getUserRunes
    // @params: id, region
    function getUserRunes(id, region) {
        return $http.get(config.COMMON_URL + region + config.base.summoner.version + config.base.summoner.label + id + '/runes' + config.API_KEY).then(function(response){
            return api.runes = response.data[id].pages;
        })
    }



// STATS
// URL: config.base.stats

    // getUserRankedStats
    // @params: region, id
    function getUserRankedStats(region, id) {
        return $http.get(config.COMMON_URL + region + config.base.stats.version + config.base.stats.label + 'by-summoner/' + id + '/ranked' + config.API_KEY)
            .then(function(response) {
                if (typeof response.data === 'object') {
                    console.log(response.data);
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, 
            function(response) {
                return $q.reject(response.data);
            }
        );
    }

    // getUserSummaryStats
    // @params: region, id
    function getUserSummaryStats(region, id) {
        return $http.get(config.COMMON_URL + region + config.base.stats.version + config.base.stats.label + 'by-summoner/' + id + '/summary' + config.API_KEY)
            .then(function(response){
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, 
            function(response) {
                return $q.reject(response.data)
            }
        );
    }



// GAMES
// URL: config.base.game

    // getUserRecentGames
    // @params: region, id
    function getUserRecentGames(region, id) {
        return $http.get(config.COMMON_URL + region + config.base.game.version + config.base.game.label + 'by-summoner/' + id + '/recent' + config.API_KEY)
            .then(function(response) {
                if (typeof response.data === 'object') {
                    api.games = response.data.games;
                    return api.games;
                } else {
                    return $q.reject(response.data);
                }
            }, 
            function(response) {
                return $q.reject(response.data);
            }
        );
    }
    

    var api = {
        users: [],
        getUser: getUser,
        getUsers: getUsers,
        getUserRankedStats: getUserRankedStats,
        getUserSummaryStats: getUserSummaryStats,
        getUserRecentGames: getUserRecentGames,
        getUserMasteries: getUserMasteries,
        getUserRunes: getUserRunes
    }

    return api;
  }

  angular.module('user', [])
    .factory('UserFactory', UserFactory)
})();
