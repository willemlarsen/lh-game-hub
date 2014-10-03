describe('BuilderCtrl', function() {
 var scope,
  builder = ["builder"];

 beforeEach(function() {
  module("app");

  inject(function($rootScope, $controller) {
   scope = $rootScope.$new();

   // mockFirebase = sinon.stub($firebase);

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

 describe('exchanges form', function() {

  it('appends paired question and answer fields to display', function() {
    var form = { 'exchanges': [ {} ] };
    scope.addFields(form);
    expect(form.exchanges.length).toBe(2);
  });

 });

});
