describe('BuilderCtrl', function() {
 var scope,
  mockSquareRepository,
  deferredLanguages,
  mockLanguageRepository,
  builder = ["builder"];

 beforeEach(function() {
  module("app");

  inject(function($rootScope, $q, $controller, LanguageRepository, SquareRepository) {
   scope = $rootScope.$new();

   mockLanguageRepository = sinon.stub(LanguageRepository);
   deferredLanguages = $q.defer();
   mockSquareRepository = sinon.stub(SquareRepository);
   mockLanguageRepository.getLanguages.returns(deferredLanguages.promise);

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
