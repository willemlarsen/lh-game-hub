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
    var progressions = [];
    if (!_.isEmpty($scope.language) && !_.isEmpty($scope.game.language) && !_.isEmpty($scope.game.dialect)) {
      progressionObjs = $scope.language[$scope.game.dialect].progressions;
      progressions = _.map(progressionObjs, function(item) { return _.toArray(item.key)[0]; });
    }
    return progressions;
  };

  $scope.$watch('game.language', function () {
    if (! _.isEmpty( $scope.game.language ) ) {
      LanguageRepository.getLanguage($scope.game.language)
      .then(function(language) {
        $scope.language = language;
      });
    }
  });

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

