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

  var init = function() {
    if (session.isValidLap()) {
      $scope.lapId = session.getGame().lapId;
      GameRepository.getSquareIds($scope.lapId).then(function(data) {
        $scope.squareIds = data;
      });
    }
  };
  init();

  $scope.$on('gameChanged', function(event) {
    init();
  });

})

;
