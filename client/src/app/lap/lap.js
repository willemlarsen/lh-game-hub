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

.controller('LapCtrl', function LapController($scope, session, GameRepository, SquareService) {

  var init = function() {
    if (session.isValidLap()) {
      $scope.lapId = session.getGame().lapId;
      GameRepository.getSquareIds($scope.lapId).then(function(data) {
        $scope.squareIds = data;
      });
    }
  };
  init();

  $scope.newSquare = function() {
    $scope.squareIds = $scope.squareIds || [];
    var squareId = $scope.squareIds[$scope.squareIds.length-1];
    if (squareId) {
      GameRepository.getSquare(squareId).then(function(data) {
        var type = SquareService.nextType(data.type);
        if (type) {
          var squareId = SquareService.newSquare(type, $scope.lapId);
          $scope.squareIds.push(squareId);
        }
      });
    } else {
      $scope.squareIds.push(
        SquareService.newSquare('what', $scope.lapId)
      );
    }
  };

  $scope.saveLap = function() {
    GameRepository.saveLap($scope.lapId, { "constraint": $scope.constraint, "squares": $scope.squareIds });
  };

  $scope.$on('gameChanged', function(event) {
    init();
  });

})

;
