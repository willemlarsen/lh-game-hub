
describe('LanguageRepository', function() {

  var LanguageRepository,
      mockFirebase;

  beforeEach(function() {
    module("app");
    inject(function($firebase, _LanguageRepository_) {
      LanguageRepository = _LanguageRepository_;
      mockFirebase = sinon.stub($firebase);
    });
  });

 describe('when getting all languages', function() {

  xit('calls firebase apis', function() {
    LanguageRepository.getLanguages();
    expect(mockFirebase.save.called).toBe(true);
  });


 });

});
