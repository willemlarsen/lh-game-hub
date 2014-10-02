angular.module( 'app.builder', [
  'ui.router',
  'firebase'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'builder', {
    url: '/builder',
    views: {
      "main": {
        controller: 'BuilderCtrl',
        templateUrl: 'builder/builder.tpl.html'
      }
    },
    data:{ pageTitle: 'Builder' }
  });
})

.controller( 'BuilderCtrl', function BuilderController( $scope, $firebase ) {
    $scope.exchanges = [];
    $scope.forms = [{}];
    $scope.addFields = function (form) {
      if(typeof form.exchanges === 'undefined') {
        form.exchanges = [];
      }
      form.exchanges.push({name:'', ac: '', a_number: '', p_id: '' });
    };

})

;
