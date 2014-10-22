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

    xit('Belongs to the variant', function() {
      //expect(scope.variant).toEqual(parent);

    });
  });


});

