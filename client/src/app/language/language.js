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

  var getLanguage = function (session) {
    var lang = session.language;
    if (! lang ) {
      lang = { name: '' };
    }
    return lang;
  };

  LanguageRepository.getLanguages().then(function(languages) {
    $scope.languages = languages;
  });

  $scope.language = getLanguage(session);
  $scope.editing = false;

  $scope.$watch('language.name', function () {
    if (! _.isEmpty( $scope.language.name ) ) {
      LanguageRepository.getLanguage($scope.language.name)
      .then(function(language) {
        $scope.language = language;
      });
    }
  });

  $scope.submit = function() {
    session.setLanguage($scope.language);
    $scope.editing = false;
  };

})

;

