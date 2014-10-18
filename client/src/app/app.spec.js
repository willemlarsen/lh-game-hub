describe( 'AppCtrl', function() {

  describe( 'isCurrentUrl', function() {
    var AppCtrl, $location, $scope;

    beforeEach( module( 'app' ) );

    beforeEach( inject( function( $controller, _$location_, $rootScope ) {
      $location = _$location_;
      $scope = $rootScope.$new();
      AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
    }));

    it( 'should pass a dummy test', inject( function() {
      expect( AppCtrl ).toBeTruthy();
    }));
  });
});

describe( 'session', function() {
  var session;

  beforeEach( module( 'app' ) );

  describe( 'create', function() {

    beforeEach( inject( function( _session_ ) {
      session = _session_;
    }));


    it( 'initializes game', function() {
      var game = {
        language: 'Irish',
        dialect: 'Conamara',
        progression: 'Simple',
        variant: "Brien's accent"
      };
      session.setLanguage(game.language);
      expect(session.game.language).toEqual(game.language);
    });

  });


});
