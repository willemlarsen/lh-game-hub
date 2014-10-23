describe('SquareCtrl', function() {
  var scope,
  session,
  deferredSquare,
  deferredLanguages,
  mockLanguageRepository;

  beforeEach(function() {
    module("app");

    inject(function($rootScope, $q, $controller, LanguageRepository, _session_) {
      scope = $rootScope.$new();
      session = _session_;

      mockLanguageRepository = sinon.stub(LanguageRepository);
      deferredSquare = $q.defer();
      deferredLanguages = $q.defer();
      mockLanguageRepository.getLanguages.returns(deferredLanguages.promise);

      $controller("SquareCtrl", {
        $scope: scope,
        LanguageRepository: mockLanguageRepository
      });

    });

  });

  describe('when initialized', function() {

    it('First Square is the "What" square', function() {
      expect(scope.type).toEqual("what");
    });

  });

  describe('when ready for next square', function() {

    beforeEach(function() {
      mockLanguageRepository.saveSquare.returns(null);
    });

    it('saves the exchanges', function() {
      scope.nextSquare();
      sinon.assert.calledOnce(mockLanguageRepository.saveSquare);
    });

  });

  describe('creating a square', function() {

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

    describe('saving', function() {

      xit('saves exchange text to SquareRepository', function() {
        var form = [{}];
        scope.submit(form);
        sinon.assert.calledOnce(mockLanguageRepository.saveSquare);
      });

      it('squareId to LanguageRepository', function() {
        var form = [{}];
        scope.submit(form);
        expect(mockLanguageRepository.save.called).toBe(true);
      });

    });


  });

});
