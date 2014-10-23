describe('BuildCtrl', function() {
 var scope,
  deferredLanguages,
  mockGameRepository,
  build = ["build"];

 beforeEach(function() {
  module("app");

  inject(function($rootScope, $q, $controller, GameRepository) {
   scope = $rootScope.$new();

   mockGameRepository = sinon.stub(GameRepository);
   deferredLanguages = $q.defer();
   mockGameRepository.getLanguages.returns(deferredLanguages.promise);

   $controller("BuildCtrl", {
    $scope: scope
   });

  });

 });

 describe('when the controller first loads', function() {

  // it('the game is retrieved', function () {
  //     sinon.assert.calledOnce(mockFirebase.getGame);
  // });
  // it('puts the catalog on the scope', function() {
  //     expect(scope.catalog).toEqual(catalog);
  // });

 });



});
