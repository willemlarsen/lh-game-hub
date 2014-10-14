angular.module('app.builder', [
 'ui.router',
 'firebase'
])

.config(function config($stateProvider) {
 $stateProvider.state('builder', {
  url: '/builder',
  views: {
   "main": {
    controller: 'BuilderCtrl',
    templateUrl: 'builder/builder.tpl.html'
   }
  },
  data: {
   pageTitle: 'Builder'
  }
 });
})

.controller('BuilderCtrl', function BuilderController($scope, LanguageRepository, SquareRepository) {

  $scope.form  = { 'interactions': [ [] ] };

  $scope.addFields = function(form) {
    form.interactions.push([]);
  };

  $scope.submit = function(form) {
    SquareRepository.save(form);
    LanguageRepository.save();
  };


})

;
