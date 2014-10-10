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

.controller('LanguageCtrl', function LanguageController($scope, Session) {
  $scope.editing = false;

  $scope.language = Session.language;
  //$scope.languageChoice = Session.languageChoice;
  //$scope.dialect = Session.dialect;
  //$scope.progression = Session.progression;
  //$scope.variant = Session.variant;

  $scope.submit = function() {
    Session.setLanguage($scope.language);
    $scope.editing = false;
  };
})

;

