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

  LanguageRepository.getLanguages().then(function(languages) {
    $scope.languages = _.sortBy(languages, _.identy);
  });


})

;
