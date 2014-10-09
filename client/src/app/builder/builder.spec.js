describe('BuilderCtrl', function() {
 var scope,
  mockSquareRepository,
  builder = ["builder"];

 beforeEach(function() {
  module("app");

  inject(function($rootScope, $controller, SquareRepository) {
   scope = $rootScope.$new();

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

 describe('square form', function() {

  it('appends paired question and answer fields to display', function() {
    var form = { 'interactions': [ [] ] };
    scope.addFields(form);
    expect(form.interactions.length).toBe(2);
  });

  it('saves exchange text to SquareRepository', function() {

    var form = [{}];

    scope.submit(form);
    expect(mockSquareRepository.save.called).toBe(true);
  });

 });


});
