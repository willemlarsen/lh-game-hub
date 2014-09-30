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

// "use strict";

describe('HomeController', function () {
  var  scope,
       home = ["home"];

    beforeEach(function () {
        module("app");

        inject(function ($rootScope, $controller, $firebase) {
            scope = $rootScope.$new();

            mockFirebase = sinon.stub($firebase);
            // mockCatalogRepository.getCatalog.returns(catalog);
            // mockRegistrationService = sinon.stub(registrationService);

            $controller("HomeController", {
                $scope: scope,
                firebase: mockFirebase
            });

        });
    });

    describe('when the controller first loads', function () {

        // it('the course catalog is retrieved', function () {
        //     sinon.assert.calledOnce(mockCatalogRepository.getCatalog);
        // });
        // it('puts the catalog on the scope', function() {
        //     expect(scope.catalog).toEqual(catalog);
        // });

    });
    // describe('when registering for a course', function() {
    //     var courseId = 'courseId';
    //     var response = {success: true, message: ''};

    //     it('adds the course to the wizard\'s schedule', function() {
    //         mockRegistrationService.register.returns(response);
    //         scope.register(courseId);
    //         sinon.assert.calledWith(mockRegistrationService.register, courseId);
    //     });

    // });

});


