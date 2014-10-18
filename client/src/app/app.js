angular.module( 'app', [
  'templates-app',
  'templates-common',
  'app.player',
  'app.builder',
  'app.about',
  'app.language',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/player' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Hub' ;
    }
  });
})

.factory('session', function () {
  var game = {
    language: '',
    dialect: '',
    progression: '',
    variant: '',
  };

  var session = {
    setGame: function(_game_) {
      game = _.clone(_game_);
    },

    getGame: function() {
      return _.clone(game);
    }
  };

  return session;
})

;

