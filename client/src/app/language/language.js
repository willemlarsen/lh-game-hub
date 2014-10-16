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

  $scope.editing = false;
  $scope.language = session.language;
  LanguageRepository.getLanguages().then(function(languages) {
    $scope.languages = languages;
  });

  $scope.submit = function() {
    session.setLanguage($scope.language);
    $scope.editing = false;
  };

})

;

