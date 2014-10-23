

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

  $scope.type = "what";

  $scope.form  = { 'interactions': [ [] ] };


  $scope.nextSquare = function() {
    GameRepository.saveSquare();
    $scope.constraint = '';
    $scope.number += 1;
  };

  $scope.addFields = function(form) {
    form.interactions.push([]);
  };

  $scope.submit = function(form) {
    GameRepository.save();
  };

})

;
