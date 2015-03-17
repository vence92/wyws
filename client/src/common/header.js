(function() {
  'use strict';

  function headerCtrl($scope, $state, ApiConfig, ProfileFactory) {
  	$scope.api = ApiConfig;
  	$scope.users = ProfileFactory.userProfiles;
  	$scope.compareWith = function() {
  		console.log('here')
  		if ($scope.user && $scope.otherUser && $scope.regionOtherUser) {
  			console.log('here')
  			$state.go('root.profile.multiple', {
  				user2: $scope.otherUser,
  				region2: $scope.regionOtherUser
  			})
  		}
  	}
  }

  angular.module('common.header', [])
    .controller('HeaderCtrl', headerCtrl);
})();
