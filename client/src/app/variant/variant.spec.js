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

  describe('when initialized', function() {

  });

  describe('init()', function() {

    beforeEach(function() {
      session = sinon.stub(session);
    });

    it("fires 'gameChanged' is broadcast", function() {
      session.isValidGame.returns(true);
      scope.$broadcast('gameChanged');
      sinon.assert.calledOnce(mockGameRepository.getLaps);
    });

    it('loads laps to scope', function() {
      session.isValidGame.returns(true);
      scope.$broadcast('gameChanged');
      sinon.assert.calledOnce(mockGameRepository.getLaps);
    });

    it("when session.isValidGame is false it doesn't load laps", function() {
      session.isValidGame.returns(false);
      scope.$broadcast('gameChanged');
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


  //scope.$eval() // triggers $watch callbacks

});

