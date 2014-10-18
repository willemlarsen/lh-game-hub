angular.module('app.language', [
  'ui.router',
  'firebase'
])

.directive('language', function() {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      title: '@'
    },
    templateUrl: "language/language.tpl.html",
    controller: 'LanguageCtrl' //Embed a custom controller in the directive
  };
})

.controller('LanguageCtrl', function LanguageController($scope, session, LanguageRepository) {

  LanguageRepository.getLanguages().then(function(languages) {
    $scope.languages = languages;
  });

  $scope.game = session.getGame();
  $scope.editing = false;

  $scope.$watch('game.language', function () {
    if (! _.isEmpty( $scope.game.language ) ) {
      LanguageRepository.getLanguage($scope.game.language)
      .then(function(language) {
        $scope.language = language;
      });
    }
  });

  $scope.submit = function() {
    session.setGame( $scope.game );
    $scope.editing = false;
  };

})

;

