describe('LapCtrl', function() {
  var scope,
    controller,
    session,
    deferredLanguages,
    mockGameRepository;

  beforeEach(function() {
    module("app");

    inject(function($rootScope, $q, $controller, GameRepository, _session_) {
      scope = $rootScope.$new();
      session = _session_;
      controller = $controller;

      mockGameRepository = sinon.stub(GameRepository);
      deferredLanguages = $q.defer();
      mockGameRepository.getLanguages.returns(deferredLanguages.promise);
      mockGameRepository.createGuid.returns("1");

      $controller("LapCtrl", {
        $scope: scope,
        GameRepository: mockGameRepository
      });

    });

  });

  describe('when initialized', function() {

    beforeEach(function() {
      mockGameRepository.createGuid.returns("1");
      session.setGame({
        language: 'English',
        dialect: 'Midwest',
        progression: 'Easy',
        variant: 'Easy1',
      });

      controller("LapCtrl", {
        $scope: scope,
        GameRepository: mockGameRepository
      });
    });

    it('lapId is set in the session', function() {
      expect(session.lapId).toEqual("lap-1");
    });

    it('lapId is saved', function() {
      sinon.assert.calledOnce(mockGameRepository.saveLap);
    });

  });

  describe('when ready for next Lap', function() {

    it('Increments Lap number by one', function() {
      scope.number = 1;
      scope.nextLap();
      expect(scope.number).toEqual(2);
    });

    it('saves the Lap', function() {
      scope.nextLap();
      sinon.assert.calledOnce(mockGameRepository.saveLap);
    });

    it('creates a new LapId', function() {
      session.lapid = "1a";
      scope.nextLap();
      expect(session.lapid).toNotEqual("lap-1a");
    });

    it('constraint field is cleared after saving to db', function() {
      var emptyConstraint = '';
      scope.nextLap();
      expect(scope.constraint).toEqual(emptyConstraint);
    });

  });

});
