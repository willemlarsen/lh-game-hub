angular.module('app.variant', [
  'ui.router',
  'firebase'
])

.directive('variant', function() {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      editable: '='
    },
    templateUrl: "variant/variant.tpl.html",
    controller: 'VariantCtrl' //Embed a custom controller in the directive
  };
})

.controller('VariantCtrl', function VariantController($scope, session, GameRepository) {

  var init = function() {
    if (session.isValidGame()) {
      GameRepository.getLaps().then(function(laps) {
        $scope.laps = laps;
      },
      function(reason) {
        console.log('Failed: ' + reason);
      });
    }
  };

  $scope.$watch('currentLap', function() {
    if ( $scope.currentLap ) {
      var game = session.getGame();
      game.lap = $scope.currentLap.lapIndex + 1;
      game.lapId = $scope.currentLap.lapId;
      session.setGame(game);
    }
  });

  $scope.$on('gameChanged', function(event) {
    init();
  });

})

;
