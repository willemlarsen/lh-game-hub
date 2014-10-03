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

.controller('BuilderCtrl', function BuilderController($scope, $firebase) {
  $scope.exchanges = [
   ["What is that?", "That is a cup."]
  ];

  $scope.form = { 'exchanges': [ [] ] };

  $scope.addFields = function(form) {
    form.exchanges.push([]);
  };
})

;
