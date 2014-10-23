

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

.controller('SquareCtrl', function SquareController($scope, session, LanguageRepository) {

  $scope.number = 1;

  $scope.nextSquare = function() {
    LanguageRepository.saveSquare();
    $scope.constraint = '';
    $scope.number += 1;
  };

})

;
