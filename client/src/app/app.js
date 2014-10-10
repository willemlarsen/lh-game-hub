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

.service('Session', function () {
  this.create = function (languageChoice, dialect, progression, variant) {
    this.languageChoice = languageChoice;
    this.dialect = dialect;
    this.progression = progression;
    this.variant = variant;
  };

  return this;
})

;

