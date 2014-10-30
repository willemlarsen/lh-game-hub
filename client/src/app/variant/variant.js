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

  var validGame = function() {
      return !_.isEmpty(session.getGame().language) &&
        !_.isEmpty(session.getGame().dialect) &&
        !_.isEmpty(session.getGame().progression) &&
        !_.isEmpty(session.getGame().variant);
    };

  var init = function() {
    if (validGame()) {
      GameRepository.getLaps().then(function(laps) {
        $scope.laps = laps;
      },
      function(reason) {
        console.log('Failed: ' + reason);
      });
    }
  };

  $scope.$watch('session.getGame().variant', function() {
    init();
  });

  $scope.currentLap = "";

})

;
