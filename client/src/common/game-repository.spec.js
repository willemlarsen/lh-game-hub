
describe('GameRepository', function() {

  var GameRepository,
      mockFirebase;

  beforeEach(function() {
    module("app");
    inject(function($firebase, _GameRepository_) {
      GameRepository = _GameRepository_;
      mockFirebase = sinon.stub($firebase);
    });
  });

 describe('when getting all languages', function() {

  xit('calls firebase apis', function() {
    GameRepository.getLanguages();
    expect(mockFirebase.save.called).toBe(true);
  });


 });

});
