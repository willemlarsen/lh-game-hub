
describe('language', function() {
 var scope,
  language,
  mockLanguageRepository;

 beforeEach(function() {
  module("app");

  inject(function($rootScope, $controller, LanguageRepository) {

    language = ["language"];

    scope = $rootScope.$new();

    mockLanguageRepository = sinon.stub(LanguageRepository);

    $controller("LanguageCtrl", {
      $scope: scope,
      LanguageRepository: mockLanguageRepository
    });

  });

 });

 describe('when the controller first loads', function() {

  xit ('gets all the languages options', function() {
    sinon.assert.calledOnce(mockLanguageRepository.getLanguages);
  });

  xit ('languages are loaded into scope', function() {
    var languages = [ 'Engrish', 'Spanglish' ];
    mockLanguageRepository.getLanguages.returns(languages);
    expect(scope.languages).toBe(languages);
  });

 });

});
