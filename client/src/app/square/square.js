

angular.module('app.square', [
  'ui.router',
])

.directive('square', function() {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      title: '@'
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

  $scope.square = {
    "type": "what",
    "props": "",
    'interactions': [angular.copy(interaction)]
  };

  $scope.addFields = function(square) {
    square.interactions.push(angular.copy(interaction));
  };

  $scope.submit = function(square) {
    var squareId = "square-" + GameRepository.createGuid();
    GameRepository.saveSquare(squareId, square);
  };

})

;
