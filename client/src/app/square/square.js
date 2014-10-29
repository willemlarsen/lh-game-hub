

angular.module('app.square', [
  'ui.router',
])

.directive('square', function() {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      type: '=',
      editable: '='
    },
    templateUrl: "square/square.tpl.html",
    controller: 'SquareCtrl' //Embed a custom controller in the directive
  };
})

.controller('SquareCtrl', function SquareController($scope, session, GameRepository) {

  var interaction = {
    "question": {
      "text": "",
      "audiofile": ""
    },
    "answer": {
      "text": "",
      "audiofile": ""
    }
  };

  var init = (function(type) {
    $scope.square = {
      "type": type,
      "props": "",
      'interactions': [angular.copy(interaction)]
    };
  })($scope.type);


  $scope.addFields = function(square) {
    square.interactions.push(angular.copy(interaction));
  };

  $scope.submit = function(square) {
    var prefix = "square-" + $scope.type + "-";
    var squareId = GameRepository.createGuid(prefix);
    GameRepository.saveSquare(squareId, square, session.getGame().lapId);
  };

})

;
