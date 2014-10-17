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

  $scope.editing = false;
  $scope.language = session.language;

  if (! $scope.language) {
    $scope.language = { name: '' };
  }

  $scope.$watch('language.name', function () {
    if (! _.isEmpty( $scope.language.name ) ) {
      LanguageRepository.getLanguage($scope.language.name)
      .then(function(language) {
        $scope.language = language;
      });
    }
    // Todo Initialize session.language from repository
    // now that we know the language we are dealing with
  });

  $scope.submit = function() {
    session.setLanguage($scope.language);
    $scope.editing = false;
  };

})

;

