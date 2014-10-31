
describe('LapCtrl', function() {
  var scope,
    controller,
    session,
    deferredLanguages,
    deferredSquares,
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
      //mockGameRepository.createGuid.returns("");
      deferredSquares = $q.defer();
      mockGameRepository.getSquareIds.returns(deferredSquares.promise);

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

    it('when isValidGame and isValidLap square ids are retrieved', function() {
      deferredSquares.resolve();
      scope.$apply();
      createLap();
      sinon.assert.calledOnce(mockGameRepository.getSquareIds);
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
      // TODO set session.getGame().lapId to something
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
