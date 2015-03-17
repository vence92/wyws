(function() {
  'use strict';

      /**
       * @name  config
       * @description config block
       */
      function config($stateProvider) {
        $stateProvider
          .state('root.compare', {
            url: '/:region/:user1/:user2',
            views: {
              '@': {
                templateUrl: 'src/app/profile/profile.tpl.html',
                controller: 'ProfileCtrl'
              }
            },
            resolve: {
                resolvedUsers: function($stateParams, UserFactory, ProfileFactory) {
                    return UserFactory.getUsers($stateParams.user1, $stateParams.user2, $stateParams.region).then(function(response){
                      console.log(response)
                      ProfileFactory.getProfileUserObj(response);
                    })
                }
            }
          });
      }
        
      /**
       * @name  compareCtrl
       * @description Controller
       */
      function CompareCtrl($scope, $rootScope, ApiConfig, UserService) {
        $scope.api = ApiConfig;
        $scope.compare = CompareFactory;

        $scope.compareSummoners = function(user1, user2, region){
            UserService.getUsers(user1, user2, region).then(function(response){
                console.log(response)
                return response;
            })
        }
      }

      /**
       * @name  compareFatory
       * @description Factory
       */
      function CompareFactory($http, $q, ApiConfig, SummonerFactory) {

        var api = {

        }

        return api;
      }

      angular.module('compare', [])
        .controller('CompareCtrl', CompareCtrl)
        .factory('CompareFactory', CompareFactory)
        .config(config)
})();