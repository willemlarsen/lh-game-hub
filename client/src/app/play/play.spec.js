
describe('PlayCtrl', function () {
  var   scope,
  mockSquareRepository,
  mockGameRepository,
  play = ["play"];

  beforeEach(function () {
    module("app");

    inject(function ($rootScope, $controller, GameRepository, SquareRepository) {
      scope = $rootScope.$new();

      mockSquareRepository = sinon.stub(SquareRepository);
      mockGameRepository = sinon.stub(GameRepository);

      $controller("PlayCtrl", {
        $scope: scope
      });

    });
  });

  describe('when the game play page is loaded', function () {

    it('the language options are loaded', function () {
      sinon.assert.calledOnce(mockGameRepository.getLanguages);
    });


    it('loads the first square', function () {
      sinon.assert.calledOnce(mockSquareRepository.getSquare);
    });

    it('loads all squares for the first lap', function () {
      // iterates through all the squares in SquareRepository
      // and displays them in play.
    });
  });

  describe('audio_path', function() {

    // it('creates the path', function() {
    //   expect($scope.audio_path("onething", "twothing")).toBe("onethingtwothing");

    // });

  });

});


