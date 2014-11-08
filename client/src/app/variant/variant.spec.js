describe('VariantCtrl', function() {
  var scope,
    session,
    deferredLaps,
    mockGameRepository;

  beforeEach(function() {
    module("app");

    inject(function($rootScope, $q, $controller, GameRepository, _session_) {
      scope = $rootScope.$new();
      session = _session_;

      mockGameRepository = sinon.stub(GameRepository);
      deferredLaps = $q.defer();
      mockGameRepository.getLaps.returns(deferredLaps.promise);

      $controller("VariantCtrl", {
        $scope: scope,
        GameRepository: mockGameRepository
      });

    });

  });

  describe('init()', function() {

    var game = {
      language: 'Irish',
      dialect: 'Connacht',
      progression: 'Brían\'s Favorite',
      progressionId: 'progressionId',
      variant: 'Connemara-1',
      variantId: 'variantId',
      lap: undefined,
      lapId: '',
    };

    var emptyGame = {
      language: '',
      dialect: '',
      progression: '',
      progressionId: '',
      variant: '',
      variantId: '',
      lap: undefined,
      lapId: '',
    };

    beforeEach(function() {

    });

    xit("fires 'gameChanged' is broadcast", function() {
      scope.$broadcast('gameChanged');
      sinon.assert.calledOnce(mockGameRepository.getLaps);
    });

    xit('loads laps to scope', function() {
      session.setGame(game);
      sinon.assert.calledOnce(mockGameRepository.getLaps);
    });

    xit("when session.isValidGame is false it doesn't load laps", function() {
      session.setGame(emptyGame);
      //scope.$broadcast('gameChanged');
      sinon.assert.notCalled(mockGameRepository.getLaps);
    });

  });

  describe('when currentLapId', function() {

    it("changes, session lap is changed", function() {
      scope.currentLap = { 1: 'another id' };
      scope.$eval();
      expect(session.getGame().lap).toEqual(scope.currentLapId);
    });

  });

  describe('newLap()', function() {

    beforeEach(function() {
      mockGameRepository.createGuid.returns('lapId');
    });

    it("creates a new lap", function() {
      var lapId = "lap-lapId-1";
      scope.currentLap = lapId;
      scope.newLap();
      expect(scope.currentLap).toNotEqual(lapId);
      expect(scope.currentLap).toNotBe(undefined);
    });

    xit('Increments Lap number by one', function() {
      scope.number = 1;
      scope.nextLap();
      expect(scope.number).toEqual(2);
    });

    it('saves the Lap', function() {
      scope.newLap();
      sinon.assert.calledOnce(mockGameRepository.saveLap);
    });

    it('creates a new LapId', function() {
      var lapId = "previous lapId";
      var game = session.getGame();
      game.lapId = lapId;
      session.setGame(game);
      scope.newLap();
      expect(session.getGame().lapId).toNotEqual(lapId);
      expect(session.getGame().lapId).toNotBe(undefined);
    });

    xit('constraint field is cleared after saving to db', function() {
      var emptyConstraint = '';
      scope.newLap();
      expect(scope.constraint).toEqual(emptyConstraint);
    });

  });

});

