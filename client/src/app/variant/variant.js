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

  // GameRepository.getLanguages().then(function(languages) {
  //     $scope.languages = languages;
  //   });
  // var validGame = function() {
  //   return !_.isEmpty(session.getGame().language) &&
  //     !_.isEmpty(session.getGame().dialect) &&
  //     !_.isEmpty(session.getGame().progression) &&
  //     !_.isEmpty(session.getGame().variant);
  // };

  // var init = (function() {
  //   if (validGame()) {
  //     var game = session.getGame();
  //     game.lapId = createLapId();
  //     session.setGame(game);
  //     GameRepository.saveLap(game.lapId, {
  //       constraint: '',
  //       squares: []
  //     });
  //   }
  // })();
  $scope.laps = [1, 2, 3, 4, 5];


})

;
