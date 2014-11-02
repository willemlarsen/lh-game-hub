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

  var variantId;

  var init = function() {
    $scope.variantId = session.getGame().variantId;
    if (session.isValidGame()) {
      GameRepository.getLaps().then(function(laps) {
        $scope.laps = laps;
      },
      function(reason) {
        console.log('Failed: ' + reason);
      });
    }
  };
  init();

  $scope.newLap = function() {
    //GameRepository.saveLap(session.getGame().lapId, $scope.currentLap);
    $scope.currentLap = GameRepository.createGuid("lap-");
    var game = session.getGame();
    game.lapId = $scope.currentLap;
    session.setGame(game);
    GameRepository.saveLap(game.lapId, {constraint: '', squares: []});
  };

  $scope.$watch('currentLap', function() {
    if ( ! _.isEmpty($scope.currentLap) ) {
      var game = session.getGame();
      game.lap = _.indexOf($scope.laps, $scope.currentLap)+1;
      game.lapId = $scope.currentLap;
      session.setGame(game);
    }
  });

  $scope.$on('gameChanged', function(event) {
    init();
  });

})

;
