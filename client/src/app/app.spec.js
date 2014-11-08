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


    it( 'initializes empty game', function() {
      var game = {
        language: '',
        dialect: '',
        progression: '',
        progressionId: '',
        variant: "",
        variantId: "",
        lap: undefined,
        lapId: "",
      };
      expect(_.keys(session.getGame())).toEqual(_.keys(game));
    });

  });

  describe( 'game', function() {

    it( 'can be set and got', function() {
      var game = {
        language: 'Irish',
        dialect: 'Conamara',
        progression: 'Simple',
        variant: "Brien's accent"
      };
      session.setGame(game);
      expect(session.getGame()).toEqual(game);
      expect(session.getGame()).not.toBe(game);
    });

    it( 'cannot be accessed directly', function() {
      var game = {
        language: 'Irish',
        dialect: 'Conamara',
        progression: 'Simple',
        variant: "Brien's accent"
      };
      expect( session.game ).not.toBeDefined();
    });

    describe( 'isValidLap()', function() {

      it( 'returns false if lapId is not defined', function() {
        var game = {
          language: 'Irish',
          dialect: 'Conamara',
          progression: 'Simple',
          variant: "Brien's accent",
          lapId: undefined
        };
        session.setGame(game);

        expect(session.isValidLap()).toBe(false);
      });

      it( 'returns true if lapId is defined', function() {
        var game = {
          language: 'Irish',
          dialect: 'Conamara',
          progression: 'Simple',
          variant: "Brien's accent",
          lapId: 'my-id'
        };
        session.setGame(game);

        expect(session.isValidLap()).toBe(true);
      });

    });

  });


});

