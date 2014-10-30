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

.controller('LanguageCtrl', function LanguageController($scope, session, GameRepository) {

  GameRepository.getLanguages().then(function(languages) {
    $scope.languages = languages;
  });

  $scope.game = session.getGame();
  $scope.editing = false;
  $scope.progressions = [];

  var canGetGameOptions = function(contextItems) {
    return _.all(contextItems, function (item) { return !_.isEmpty(item); } );
  };

  $scope.getProgressions = function () {
    if (!canGetGameOptions([
          $scope.language,
          $scope.game.language,
          $scope.game.dialect
        ])) { return []; }

    var progressions = $scope.language[$scope.game.dialect].progressions;
    return _.map(progressions, function (item){  return _.first(_.keys(item)); });
  };

  var findGameProgression = function (progressions) {
    return _.find(progressions, function (progression) {
      return _.first(_.keys(progression)) === $scope.game.progression;
    });
  };

  var findGameVariant = function (variants) {
    return _.find(variants, function (variant) {
      return _.first(_.keys(variant)) === $scope.game.variant;
    });
  };

  var getProgressionId = function (progression) {
      return _.first(_.values(progression));
  };

  var getVariantId = function (variant) {
      return _.first(_.values(variant));
  };

  var canGetVariants = function () {
    var elements = [
        $scope.language,
        $scope.game.language,
        $scope.game.dialect,
        $scope.game.progression
      ];

    return canGetGameOptions(elements);
  };

  var getVariantsFromScope = function () {
    var language = $scope.language,
    dialect = language[$scope.game.dialect],
    progressions = dialect.progressions,
    progression = findGameProgression(progressions),
    progressionId = getProgressionId(progression),
    variants = language[progressionId].variants;

    $scope.game.progressionId = 'progressionId';

    return variants;
  };

  var properFormat = function (list) {
     return _.map(list, function (item){  return _.first(_.keys(item)); });
  };

  $scope.getVariants = function () {
    if (!canGetVariants()) { return []; }

    var variants = getVariantsFromScope();
    return properFormat(variants);
  };

  var assignVariantId = function () {
    var variants = getVariantsFromScope(),
    variant = findGameVariant(variants),
    variantId = getVariantId(variant);
    $scope.game.variantId = _.first(_.values(variant));
  };

  $scope.$watch('game.language', function () {
    if (! _.isEmpty( $scope.game.language ) ) {
      GameRepository.getLanguage($scope.game.language)
      .then(function(language) {
        $scope.language = language;
      });
    }
  });

  $scope.$watch('game.dialect', function() {
    $scope.progressions = $scope.getProgressions();
  });

  $scope.submit = function() {
    assignVariantId();
    session.setGame( $scope.game );
    $scope.editing = false;
  };

})

;

