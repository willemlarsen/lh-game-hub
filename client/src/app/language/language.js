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
   template: "<div ng-controller='LanguageCtrl'>" +
                "<h2>Language: {{languageChoice}}</h2>" +
                "<h2>Dialect: {{dialect}}</h2>" +
                "<h2>Progression: {{progression}}</h2>" +
                "<h2>Variant: {{variant}}</h2>" +
             "</div>",
   controller: 'LanguageCtrl' //Embed a custom controller in the directive
  };
 })

.controller('LanguageCtrl', function LanguageController($scope, $firebase, SquareRepository) {
    $scope.languageChoice = 'A';
    $scope.dialect = 'la-la';
    $scope.progression = 'ho-ho';
    $scope.variant = 'hee-hee';
})

;

