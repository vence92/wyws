(function() {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config($stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/index');
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('httpInterceptor');
    $stateProvider
      .state('root', {
        views: {
          'header': {
            templateUrl: 'src/common/header.tpl.html',
            controller: 'HeaderCtrl',   
          },
          'footer': {
            templateUrl: 'src/common/footer.tpl.html',
            controller: 'FooterCtrl'
          }
        }
      });
  }

  function MainCtrl($log) {
    $log.debug('MainCtrl laoded!');
  }

  function run($state,$rootScope) {
    $rootScope.$state = $state;
  }

  angular.module('app', [
      'ui.router',
      'index',
      'profile',
      'summoner',
      'observer',
      'common.header',
      'common.footer',
      'common.services.data',
      'common.directives.version',
      'common.filters.uppercase',
      'common.interceptors.http',
      'common.config.ApiConfig',
      'templates'
    ])
    .config(config)
    .run(run)
    .controller('MainCtrl', MainCtrl)
    .value('version', '1.0.4')
})();
