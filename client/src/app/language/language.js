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
  $scope.progressions = [];

  $scope.getProgressions = function() {
    if (!_.isEmpty($scope.language) && !_.isEmpty($scope.game.language) && !_.isEmpty($scope.game.dialect)) {
      var progressions = $scope.language[$scope.game.dialect].progressions;
      return _.map(progressions, function(item){  return _.first(_.keys(item)); });
    }
    return [];
  };
  $scope.canGetVariants = function() {
    var elements = [$scope.language, $scope.game.language,
                    $scope.game.dialect, $scope.game.progression];
    return _.all(elements, function (item) { return !_.isEmpty(item); } );
  };

   $scope.getVariants = function() {
    if (!$scope.canGetVariants()) { return []; }

      var language = $scope.language,
          dialect = language[$scope.game.dialect],
          progressions = dialect.progressions,
          theResultWeWant = (_.find(progressions, function (progression) {
              return _.first(_.keys(progression)) === $scope.game.progression;
            })),
          progression = theResultWeWant,
          progressionId = _.first(_.values(progression)),
          variants = language[progressionId].variants;

       return _.map(variants, function(item){  return _.first(_.keys(item)); });
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
    $scope.progressions = $scope.getProgressions();
  });

  $scope.submit = function() {
    session.setGame( $scope.game );
    $scope.editing = false;
  };

})

;

