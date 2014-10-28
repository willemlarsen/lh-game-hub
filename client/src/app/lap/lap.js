angular.module('app.lap', [
  'ui.router',
  'firebase'
])

.directive('lap', function() {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      title: '@'
    },
    templateUrl: "lap/lap.tpl.html",
    controller: 'LapCtrl' //Embed a custom controller in the directive
  };
})

.controller('LapCtrl', function LapController($scope, session, GameRepository) {

  var validGame = function() {
    return !_.isEmpty(session.getGame().language) &&
      !_.isEmpty(session.getGame().dialect) &&
      !_.isEmpty(session.getGame().progression) &&
      !_.isEmpty(session.getGame().variant);
  };

  var createLapId = function() {
    return "lap-" + GameRepository.createGuid();
  };

  $scope.validGame = validGame;

  var init = (function() {
    if (validGame()) {
      var game = session.getGame();
      game.lapId = createLapId();
      session.setGame(game);
      GameRepository.saveLap(game.lapId, {constraint: '', squares: []});
    }
  })();

  $scope.number = 1;
  session.lapId = createLapId();

  $scope.nextLap = function() {
    GameRepository.saveLap();
    $scope.constraint = '';
    $scope.number += 1;
    session.lapId = createLapId();
  };

})

;
