/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
// describe( 'home section', function() {
//   beforeEach( module( 'app.home' ) );

//   it( 'should have a dummy test', inject( function() {
//     expect( true ).toBeTruthy();
//   }));
// });

describe('HomeCtrl', function () {
  var   scope,
        mockSquareRepository,
        home = ["home"];

    beforeEach(function () {
        module("app");

        inject(function ($rootScope, $controller, SquareRepository) {
            scope = $rootScope.$new();

            // mockFirebase = sinon.stub($firebase);
            mockSquareRepository = sinon.stub(SquareRepository);

            $controller("HomeCtrl", {
                $scope: scope
                // firebase: mockFirebase
            });

        });
    });

    // describe('when the controller first loads', function () {

        // it('the game is retrieved', function () {
        //     sinon.assert.calledOnce(mockFirebase.getGame);
        // });
        // it('puts the catalog on the scope', function() {
        //     expect(scope.catalog).toEqual(catalog);
        // });

    // });

    describe('when the game player page is loaded', function () {
        it('loads the square', function () {
            sinon.assert.calledOnce(mockSquareRepository.getSquare);
        });
    });

    describe('audio_path', function() {

        // it('creates the path', function() {
        //   expect($scope.audio_path("onething", "twothing")).toBe("onethingtwothing");

        // });

    });

});


