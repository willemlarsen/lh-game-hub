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

  $scope.getProgressions = function() {
    var progressionKeys = [];
    if (!_.isEmpty($scope.language) && !_.isEmpty($scope.game.language) && !_.isEmpty($scope.game.dialect)) {
      var gameLanguage = $scope.game.language;
      var gameDialect = $scope.game.dialect;
      var progressions = $scope.language[gameDialect].progressions;
      for (var index = 0; index < progressions.length; index++) {
        var progressionsObject = progressions[index];
        for (var key in progressionsObject) {
          progressionKeys.push(key);
        }
      }
    }
    return progressionKeys;
  };

  $scope.$watch('game.language', function () {
    if (! _.isEmpty( $scope.game.language ) ) {
      LanguageRepository.getLanguage($scope.game.language)
      .then(function(language) {
        $scope.language = language;
      });
    }
  });

  $scope.$watch('game.dialect', function() {

  });

  $scope.submit = function() {
    session.setGame( $scope.game );
    $scope.editing = false;
  };

})

;

