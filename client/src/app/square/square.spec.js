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
      square = {
        'interactions': [
          []
        ]
      };
      scope.addFields(square);
      expect(square.interactions.length).toBe(2);
    });

  });

  describe('when saving a square', function() {

    var guid = "1";

    beforeEach(function() {
      mockGameRepository.createGuid.returns(guid);
    });

    it('square is saved', function() {
      var form = [{}];
      scope.squareId = 'squareId';
      session.setGame({lapId: 'lapId'});
      scope.submit(form);
      sinon.assert.calledWith(mockGameRepository.saveSquare, "squareId", form, "lapId");
    });

  });

});

describe( 'SquareService', function() {

  var SquareService;

  beforeEach( module( 'app' ) );

  beforeEach( inject( function( _SquareService_ ) {
    SquareService = _SquareService_;
  }));

  describe( 'nextType()', function() {

    it( 'returns "who" for "what"', function() {
      expect(SquareService.nextType('what')).toEqual('who');
    });

    it( 'returns "where" for "who"', function() {
      expect(SquareService.nextType('who')).toEqual('where');
    });

    it( 'returns "how many" for "where"', function() {
      expect(SquareService.nextType('where')).toEqual('how many');
    });

    it( 'returns "undefined" for "how"', function() {
      expect(SquareService.nextType('how')).toBeUndefined();
    });

  });

});


