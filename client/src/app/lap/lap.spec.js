describe('LapCtrl', function() {
  var scope,
  session,
  deferredLanguages,
  mockLanguageRepository;

  beforeEach(function() {
    module("app");

    inject(function($rootScope, $q, $controller, LanguageRepository, _session_) {
      scope = $rootScope.$new();
      session = _session_;

      mockLanguageRepository = sinon.stub(LanguageRepository);
      deferredLanguages = $q.defer();
      mockLanguageRepository.getLanguages.returns(deferredLanguages.promise);

      $controller("LapCtrl", {
        $scope: scope,
        LanguageRepository: mockLanguageRepository
      });

    });

  });

  describe('when initialized', function() {

    it('First Lap has the number 1', function() {
      expect(scope.number).toEqual(1);
    });

    xit('initializes the first square, "What"', function() {
      expect(scope.square).toEqual('what');
    });

    xit('Belongs to the variant', function() {
      //expect(scope.variant).toEqual(parent);
    });

    xit('UI allows constraint input', function() {
      var userInputConstraint = "First and Second Person Singular";
      expect(scope.constraint).toEqual(constraint);
    });

  });

  describe('when ready for next Lap', function() {

    it('Increments Lap number by one', function() {
      scope.number = 1;
      scope.nextLap();
      expect(scope.number).toEqual(2);
    });

    it('constraint field is cleared after saving to db', function() {
      var emptyConstraint = '';
      scope.nextLap();
      sinon.assert.calledOnce(mockLanguageRepository.saveLap);
      expect(scope.constraint).toEqual(emptyConstraint);
    });

  });

});
