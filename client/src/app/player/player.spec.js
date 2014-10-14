
describe('PlayerCtrl', function () {
  var   scope,
        mockSquareRepository,
        player = ["player"];

    beforeEach(function () {
        module("app");

        inject(function ($rootScope, $controller, SquareRepository) {
            scope = $rootScope.$new();

            mockSquareRepository = sinon.stub(SquareRepository);

            $controller("PlayerCtrl", {
                $scope: scope
            });

        });
    });

    describe('when the game player page is loaded', function () {
        it('loads the first square', function () {
            sinon.assert.calledOnce(mockSquareRepository.getSquare);
        });

        it('loads all squares for the first lap', function () {
            // iterates through all the squares in SquareRepository
            // and displays them in player.
        });
    });

    describe('audio_path', function() {

        // it('creates the path', function() {
        //   expect($scope.audio_path("onething", "twothing")).toBe("onethingtwothing");

        // });

    });

});


