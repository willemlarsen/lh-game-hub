describe('BuilderCtrl', function() {
 var scope,
  mockSquareRepository,
  mockLanguageRepository,
  builder = ["builder"];

 beforeEach(function() {
  module("app");

  inject(function($rootScope, $controller, LanguageRepository, SquareRepository) {
   scope = $rootScope.$new();

   mockLanguageRepository = sinon.stub(LanguageRepository);
   mockSquareRepository = sinon.stub(SquareRepository);

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

 describe('creating a square', function() {

  it('appends paired question and answer fields to display', function() {
    var form = { 'interactions': [ [] ] };
    scope.addFields(form);
    expect(form.interactions.length).toBe(2);
  });

  describe('saving', function() {
    it('saves exchange text to SquareRepository', function() {
      var form = [{}];
      scope.submit(form);
      expect(mockSquareRepository.save.called).toBe(true);
    });

    it('squareId to LanguageRepository', function() {
      var form = [{}];
      scope.submit(form);
      expect(mockLanguageRepository.save.called).toBe(true);
    });

  });


 });


});
