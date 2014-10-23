angular.module('app.build', [
 'ui.router',
 'firebase'
])

.config(function config($stateProvider) {
 $stateProvider.state('build', {
  url: '/build',
  views: {
   "main": {
    controller: 'BuildCtrl',
    templateUrl: 'build/build.tpl.html'
   }
  },
  data: {
   pageTitle: 'Build'
  }
 });
})

.controller('BuildCtrl', function BuildController($scope, GameRepository) {

  GameRepository.getLanguages().then(function(languages) {
    $scope.languages = _.sortBy(languages, _.identy);
  });


})

;
