
describe('LanguageCtrl', function() {
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

  describe('when submitting a game selection', function() {

    it('the game is stored in session', function() {
      var game = {
        language: 'English',
        dialect: 'Midwest',
        progression: 'Easy',
        variant : 'Zhon\'s Utah Accent'
      };
      mockSession = sinon.stub(session);
      scope.submit();
      sinon.assert.calledOnce(mockSession.setGame);
    });

  });


});
