describe('SquareCtrl', function() {
  var scope,
    session,
    deferredSquare,
    deferredLanguages,
    mockGameRepository;

  beforeEach(function() {
    module("app");

    inject(function($rootScope, $q, $controller, GameRepository, _session_) {
      scope = $rootScope.$new();
      session = _session_;

      mockGameRepository = sinon.stub(GameRepository);
      deferredSquare = $q.defer();
      deferredLanguages = $q.defer();
      mockGameRepository.getLanguages.returns(deferredLanguages.promise);

      $controller("SquareCtrl", {
        $scope: scope,
        GameRepository: mockGameRepository
      });

    });

  });

  describe('when initialized', function() {

  });

  describe('when submitting a square', function() {

    beforeEach(function() {
      mockGameRepository.saveSquare.returns(null);
    });

    it('saves the exchanges', function() {
      scope.submit();
      sinon.assert.calledOnce(mockGameRepository.saveSquare);
    });

  });

  describe('when creating a square', function() {

    beforeEach(function() {
      deferredLanguages.resolve();
      deferredSquare.resolve();
      scope.$apply();
    });


    it('appends paired question and answer fields to display', function() {
      var form = {
        'interactions': [
          []
        ]
      };
      scope.addFields(form);
      expect(form.interactions.length).toBe(2);
    });

  });

  describe('when saving a square', function() {

    var guid = "1";

    beforeEach(function() {
      mockGameRepository.createGuid.returns(guid);
    });

    it('a squareId is created', function() {
      var form = [{}];
      scope.submit(form);
      sinon.assert.calledOnce(mockGameRepository.createGuid);
    });

    it('squareId is saved to lap', function() {
      var squareId = '1',
      lapId = '1',
      square = {};
      session.setGame({lapId: lapId});
      scope.submit(square);
      sinon.assert.calledWith(mockGameRepository.saveSquare, squareId, square, lapId);
    });

    it('square is saved', function() {
      var form = [{}];
      scope.submit(form);
      sinon.assert.calledWith(mockGameRepository.saveSquare, "1", form);
    });

  });

});

describe( 'SquareService', function() {

  beforeEach( module( 'app' ) );

  describe( 'create', function() {

    beforeEach( inject( function( _session_ ) {
      session = _session_;
    }));


    xit( 'initializes empty game', function() {
      expect(session.getGame()).toEqual(game);
    });

  });

});


