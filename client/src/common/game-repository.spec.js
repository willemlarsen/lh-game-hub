
describe('GameRepository', function() {

  var GameRepository,
      mockFirebase;

  beforeEach(function() {
    module("app");
    inject(function(_GameRepository_) {
      GameRepository = _GameRepository_;
      mockFirebase = sinon.stub(Firebase);
    });
  });

 describe('when getting all languages', function() {

  xit('calls firebase apis', function() {
    GameRepository.getLanguages();
    expect(mockFirebase.save.called).toBe(true);
  });

 });

 describe('saving square', function() {

   xit('squareId is saved to lap', function() {
     //mockGameRepository = sinon.spy(GameRepository);
     //mockGameRepository.saveSquare(squareId, square, lapId);
     //sinon.assert.calledOnce(mockGameRepository.saveSquareToLap);
   });

  xit('calls to Firebase', function() {
    GameRepository.saveSquare("guid");
    sinon.assert.calledOnce(mockFirebase.set);
  });

 });


});
