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

describe('HomeController', function () {
  var  scope,
       home = ["home"];

    beforeEach(function () {
        module("app");

        inject(function ($rootScope, $controller, $firebase) {
            scope = $rootScope.$new();

            // mockFirebase = sinon.stub($firebase);
            // mockCatalogRepository.getCatalog.returns(catalog);
            // mockRegistrationService = sinon.stub(registrationService);

            // $controller("HomeController", {
            //     $scope: scope,
            //     firebase: mockFirebase
            // });

        });
    });

    describe('when the controller first loads', function () {

        // it('the game is retrieved', function () {
        //     sinon.assert.calledOnce(mockFirebase.getGame);
        // });
        // it('puts the catalog on the scope', function() {
        //     expect(scope.catalog).toEqual(catalog);
        // });

    });

    describe('audio_path', function() {

        // it('creates the path', function() {
        //   expect($scope.audio_path("onething", "twothing")).toBe("onethingtwothing");

        // });

    });

});


