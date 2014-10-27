describe('LapCtrl', function() {
  var scope,
  session,
  deferredLanguages,
  mockGameRepository;

  beforeEach(function() {
    module("app");

    inject(function($rootScope, $q, $controller, GameRepository, _session_) {
      scope = $rootScope.$new();
      session = _session_;

      mockGameRepository = sinon.stub(GameRepository);
      deferredLanguages = $q.defer();
      mockGameRepository.getLanguages.returns(deferredLanguages.promise);

      $controller("LapCtrl", {
        $scope: scope,
        GameRepository: mockGameRepository
      });

    });

  });

  describe('when initialized', function() {

    it('First Lap has the number 1', function() {
      expect(scope.number).toEqual(1);
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
    it('creates a new LapId', function () {
      scope.lapid = "1a";
      scope.nextLap();
      expect(scope.lapid).toNotEqual("1a");
    });

    it('constraint field is cleared after saving to db', function() {
      var emptyConstraint = '';
      scope.nextLap();
      expect(scope.constraint).toEqual(emptyConstraint);
    });

  });

});
