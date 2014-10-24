describe('SquareCtrl', function() {
  var scope,
  session,
  deferredSquare,
  deferredLanguages,
  mockGameRepository;

  beforeEach(function() {
    module("app");

    inject(function($rootScope, $q, $controller, GameRepository, _session_) {
      scope = $rootScope.$new();
      session = _session_;

      mockGameRepository = sinon.stub(GameRepository);
      deferredSquare = $q.defer();
      deferredLanguages = $q.defer();
      mockGameRepository.getLanguages.returns(deferredLanguages.promise);

      $controller("SquareCtrl", {
        $scope: scope,
        GameRepository: mockGameRepository
      });

    });

  });

  describe('when initialized', function() {

    it('makes the first Square is the "What" square', function() {
      expect(scope.type).toEqual("what");
    });

  });

  describe('when submitting a square', function() {

    beforeEach(function() {
      mockGameRepository.saveSquare.returns(null);
    });

    it('saves the exchanges', function() {
      scope.nextSquare();
      sinon.assert.calledOnce(mockGameRepository.saveSquare);
    });

  });

  describe('when creating a square', function() {

    beforeEach(function() {
      deferredLanguages.resolve();
      deferredSquare.resolve();
      scope.$apply();
    });


    it('appends paired question and answer fields to display', function() {
      var form = { 'interactions': [ [] ] };
      scope.addFields(form);
      expect(form.interactions.length).toBe(2);
    });

    describe('when saving a square', function() {

      it('saves squareId to GameRepository', function() {
        var form = [{}];
        scope.submit(form);
        expect(mockGameRepository.save.called).toBe(true);
      });

    });


  });

});
