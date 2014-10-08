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

.controller('BuilderCtrl', function BuilderController($scope, $firebase, SquareRepository) {

  $scope.form = { 'square': [ [] ] };

  $scope.addFields = function(form) {
    form.square.push([]);
  };

  $scope.submit = function(form) {
    SquareRepository.save(form);
  };


})

;
