describe('BuilderCtrl', function() {
 var scope,
  mockSquareRepository,
  deferredLanguages,
  mockGameRepository,
  builder = ["builder"];

 beforeEach(function() {
  module("app");

  inject(function($rootScope, $q, $controller, GameRepository, SquareRepository) {
   scope = $rootScope.$new();

   mockGameRepository = sinon.stub(GameRepository);
   deferredLanguages = $q.defer();
   mockSquareRepository = sinon.stub(SquareRepository);
   mockGameRepository.getLanguages.returns(deferredLanguages.promise);

   $controller("BuilderCtrl", {
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
