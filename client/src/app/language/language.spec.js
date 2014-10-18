
describe('LanguageCtrl', function() {
  var scope,
  deferredLanguages,
  mockLanguageRepository;

  beforeEach(function() {
    module("app");

    inject(function($rootScope, $controller, LanguageRepository, $q) {
      scope = $rootScope.$new();

      mockLanguageRepository = sinon.stub(LanguageRepository);
      deferredLanguages = $q.defer();
      mockLanguageRepository.getLanguages.returns(deferredLanguages.promise);

      $controller("LanguageCtrl", {
        $scope: scope,
        LanguageRepository: mockLanguageRepository
      });

    });

  });

  describe('when the controller first loads', function() {
    var languages = [ 'Engrish', 'Spanglish' ];

    beforeEach(function() {
      deferredLanguages.resolve(languages);
      scope.$apply();
    });

    it ('gets all the languages options', function() {
      sinon.assert.calledOnce(mockLanguageRepository.getLanguages);
    });

    it ('languages are loaded into scope', function() {
      expect(scope.languages).toBe(languages);
    });

  });
  describe('when a language is selected', function() {

    it('allows user to select a dialect', function() {

    });
  });
});
