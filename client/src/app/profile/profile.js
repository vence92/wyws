(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.profile', {
        url: '/:region/profile/:username/',
        views: {
          '@': {
            templateUrl: 'src/app/profile/profile.tpl.html',
            controller: 'ProfileCtrl'
          }
        },
        resolve: {
          resolvedUser: function($stateParams, UserFactory, ProfileFactory) {
            return UserFactory.getUser($stateParams.username, $stateParams.region).then(function(response){
              ProfileFactory.getProfileUserObj(response);
            })
          }
        }
      })
  }

  /**
   * @name  profileCtrl
   * @description Controller
   */
  function ProfileCtrl($scope, $stateParams, ProfileFactory, UserFactory) {
    $scope.users = UserFactory.users;
    console.log($scope.users)
  }

  /**
   * @name  profileFactory
   * @description Factory
   */
  function ProfileFactory($q, $stateParams, UserFactory) {

    // Build custom user object for profile view.
    function getProfileUserObj(user) {
        $q.all({
          masteries: UserFactory.getUserMasteries(user.id, user.region),
          runes: UserFactory.getUserRunes(user.id, user.region),
          recentGames: UserFactory.getUserRecentGames(user.region, user.id)
        })
        .then(function(results){
          angular.forEach(api.userProfiles, function(userProfile) {
            console.log(user.name, userProfile.name)
            if (userProfile.name !== user.name ) {
              var userProfile = angular.extend({}, user, results);
              api.userProfiles.push(userProfile);
              console.log(api.userProfiles)
              return api.userProfiles;
            }
            else {
              console.log('user alrdy exists')
            }
          })
          
        })
      }

    var api = {
      userProfiles : [],
      getProfileUserObj: getProfileUserObj
    }

    return api;
  }


  angular.module('profile', [])
    .config(config)
    .controller('ProfileCtrl', ProfileCtrl)
    .factory('ProfileFactory', ProfileFactory)
})();
