
describe('LapCtrl', function() {
  var scope,
    controller,
    session,
    deferredLanguages,
    deferredSquares,
    deferredSquare,
    mockSquareService,
    mockGameRepository;

  beforeEach(function() {
    module("app");

    inject(function($rootScope, $q, $controller, GameRepository, _session_, SquareService) {
      scope = $rootScope.$new();
      session = _session_;
      controller = $controller;

      mockGameRepository = sinon.stub(GameRepository);
      deferredLanguages = $q.defer();
      mockGameRepository.getLanguages.returns(deferredLanguages.promise);
      //mockGameRepository.createGuid.returns("");
      deferredSquares = $q.defer();
      mockGameRepository.getSquareIds.returns(deferredSquares.promise);
      mockSquareService = sinon.stub(SquareService);
      deferredSquare = $q.defer();

      $controller("LapCtrl", {
        $scope: scope,
        GameRepository: mockGameRepository
      });

    });

  });

  describe('when initialized', function() {

    var game = {
      language: 'English',
      dialect: 'Midwest',
      progression: 'Easy',
      variant: 'Easy1',
      lapId: 'lapId-1',
    };

    var createLap = function() {
      controller("LapCtrl", {
        $scope: scope,
        GameRepository: mockGameRepository
      });
    };

    var x = function(x) {
      console.log(x + ' something');
    };

    beforeEach(function() {
      mockGameRepository.createGuid.returns("1");
      session.setGame(game);
    });

    it('lapId is set in the session', function() {
      createLap();
      expect(session.getGame().lapId).toEqual("lapId-1");
    });

    xit('lap is saved in session if we have no lap id', function() {
      expect(session.getGame().lap).toEqual(1);
    });

    it('when isValidLap, square ids are retrieved', function() {
      deferredSquares.resolve();
      scope.$apply();
      sinon.assert.calledOnce(mockGameRepository.getSquareIds);
    });

  });

  describe('newSquare()', function() {

    var square = {
      type: 'what'
    };

    beforeEach(function() {
      mockGameRepository.getSquare.returns(deferredSquare.promise);
    });

    it('with no other squares, creates squre type "what"', function() {
      scope.squareIds = [];
      scope.newSquare();
      sinon.assert.calledWith(mockSquareService.newSquare, 'what', undefined);
    });

    xit('with "what" as last square will create "who" square', function() {
      scope.squareIds = ["squareId-1"];
      deferredSquare.resolve(square);
      scope.$apply();
      scope.newSquare();
      sinon.assert.calledOnce(mockSquareService.newSquare);
      sinon.assert.calledWith(mockSquareService.newSquare, 'who', undefined);
    });

  });

});
