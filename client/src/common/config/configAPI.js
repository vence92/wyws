(function() {
  'use strict';

  angular.module('common.config.ApiConfig', [])
    .constant('ApiConfig', {
    //put onserve side l8ter
      API_KEY : '?api_key=eb5cff4a-9a8a-4932-a8f8-429e6d9c7183',
      COMMON_URL: 'https://euw.api.pvp.net/api/lol/',
      OBSERVER_URL: 'https://euw.api.pvp.net/observer-mode/rest/',
      //base config
      base: {
        
        regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr'],

        summoner: {
          label: '/summoner/',
          version: '/v1.4',
        },
        stats: {
          label: '/stats/',
          version: '/v1.3'
        },
        match: {
          label: '/match/',
          version: '/v2.2',
          history: {
            label : 'matchhistory'
          }
        },
        staticdatas: {
          label: '/static-data/',
          version: '/v1.2'
        },
        league: {
          label: '/league/',
          version : '/v2.5'
        },
        game: {
          label: '/game/',
          version: '/v1.3'
        }
      },

      //config for featured games, and current player in game
      observer: {
        urlnext: 'consumer/getSpectatorGameInfo/',
        currentgame: {
          regions: ['BR1', 'EUN1', 'EUW1', 'KR', 'LA1', 'LA2', 'NA1', 'OC1', 'RU', 'TR1']
        }
      }
  });
})();