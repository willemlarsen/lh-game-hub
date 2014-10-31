angular.module( 'app', [
  'app.about',
  'app.build',
  'app.language',
  'app.lap',
  'app.play',
  'app.square',
  'app.variant',
  'ngCookies',
  'templates-app',
  'templates-common',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/play' );
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

.factory('session', function ($rootScope, $cookies) {
  var game = {
    language: '',
    dialect: '',
    progression: '',
    progressionId: '',
    variant: '',
    variantId: '',
    lap: undefined,
    lapId: '',
  };
  var xgame = {
    language: 'Irish',
    dialect: 'Connacht',
    progression: 'Brían\'s Favorite',
    progressionId: 'progressionId',
    variant: 'Connemara-1',
    variantId: 'variantId',
    lap: undefined,
    lapId: '',
  };

  if ($cookies.game) {
    game = $cookies.game;
  }

  var isValidGame = function() {
      return !_.isEmpty(game.language) &&
        !_.isEmpty(game.dialect) &&
        !_.isEmpty(game.progression) &&
        !_.isEmpty(game.variant);
    };

  var session = {
    setGame: function(_game_) {
      game = _.clone(_game_);
      $cookies.game = game;
      $rootScope.$broadcast('gameChanged');
    },

    getGame: function() {
      return _.clone(game);
    },

    isValidGame: isValidGame,

    isValidLap: function() {
      return isValidGame() && !_.isEmpty(game.lapId);
    },

  };

  return session;
})

;

