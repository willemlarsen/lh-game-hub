angular.module('app.lap', [
  'ui.router',
  'firebase'
])

.directive('lap', function() {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      editable: '='
    },
    templateUrl: "lap/lap.tpl.html",
    controller: 'LapCtrl' //Embed a custom controller in the directive
  };
})

.controller('LapCtrl', function LapController($scope, session, GameRepository) {

  var createLapId = function() {
    return "lap-" + GameRepository.createGuid();
  };

  var init = (function() {
    if (session.isValidGame()) {
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
