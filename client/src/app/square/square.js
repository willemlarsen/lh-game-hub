

angular.module('app.square', [
  'ui.router',
])

.directive('square', function() {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      editable: '=',
      squareId: '=',
    },
    templateUrl: "square/square.tpl.html",
    controller: 'SquareCtrl' //Embed a custom controller in the directive
  };
})

.controller('SquareCtrl', function SquareController($scope, session, GameRepository, SquareService) {

  var init = function(squareId) {
    if (! _.isEmpty(squareId)) {
      $scope.squareId = squareId;
      GameRepository.getSquare(squareId).then(function (data) {
        $scope.square = data;
      });
    }
  };
  init($scope.$parent.squareId);


  $scope.addFields = function(square) {
    SquareService.addInteraction(square);
  };

  $scope.submit = function(square) {
    GameRepository.saveSquare($scope.squareId, square, session.getGame().lapId);
  };

})

.factory('SquareService', function SquareService(GameRepository) {

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

  var createSquareGuid = function(type) {
    var prefix = "square-" + type.replace(' ', '-') + "-";
    return GameRepository.createGuid(prefix);
  };

  return {

    addInteraction: function() {
      square.interactions.push(angular.copy(interaction));
    },

    newSquare: function(type, lapId) {
      var id = createSquareGuid(type);
      var square = {
        "type": type,
        "props": "",
        'interactions': [angular.copy(interaction)]
      };

      GameRepository.saveSquare(id, square, lapId);

      return { id: square };
    }

  };
})

;
