
describe('LanguageCtrl', function() {
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

      $controller("LanguageCtrl", {
        $scope: scope,
        GameRepository: mockGameRepository
      });

    });

  });

  describe('when the controller first loads', function() {
    var languages = [ 'Engrish', 'Spanglish' ];

    beforeEach(function() {
      deferredLanguages.resolve(languages);
      scope.$apply();
    });

    it ('gets all the languages options', function() {
      sinon.assert.calledOnce(mockGameRepository.getLanguages);
    });

    it ('languages are loaded into scope', function() {
      expect(scope.languages).toBe(languages);
    });

  });

  describe('when a language is selected', function() {

    it('allows user to see dialect options', function() {
    });

  });

  describe('when submitting a game selection', function() {

    xit('the game is stored in session', function() {
      var game = {
        language: 'English',
        dialect: 'Midwest',
        progression: 'Easy',
        variant : 'Zhon\'s Utah Accent'
      };
      mockSession = sinon.stub(session);
      scope.submit();
      sinon.assert.calledOnce(mockSession.setGame);
    });

  });

  describe('when selecting a game', function() {

    describe('getLanguages()', function() {

      it('will return empty list if language is not defined', function() {
        scope.game = { language: '' };
        expect(scope.getProgressions()).toEqual([]);
      });

      it('will return empty list if dialect is not defined', function() {
        scope.game = {
          language: 'English',
          //dialect: 'Western',
        };
        expect(scope.getProgressions()).toEqual([]);
      });

      it('will retrieve available progressions', function() {
        var progressions = [ { "Hard Midwest": "progressionId"}, {"Easy Midwest": "id2"} ];
        var progressionKeys = _.map(progressions, function(item){  return _.first(_.keys(item)); });
        scope.language = {
            "name":"English",
            "dialects": ["Texas", 'Midwest'],
            'Midwest': {
              'progressions': progressions
            }
        };
        scope.game = {
          language: 'English',
          dialect: 'Midwest',
          progression: '',
          variant : ''
        };

        expect(scope.getProgressions()).toEqual(progressionKeys);
      });
      it('will return empty list of variants if progression is not defined', function() {
        scope.game = {
          variants: []
        };
        expect(scope.getVariants()).toEqual([]);
      });

      it('returns the available variants for a given progression', function() {
      var progressions = [ { "Hard Midwest": "progressionId"}, {"Easy Midwest": "id2"} ];
      var variantKeys = ["Rural Midwest", "Urban Midwest"];
        scope.language = {
            "name":"English",
            "dialects": ["Texas", 'Midwest'],
            'Midwest': {
              'progressions': progressions
            },
            "progressionId": {
              'variants': [
              { "Rural Midwest": "variantId" },
              { "Urban Midwest": "variantId2" }
              ]
            }
        };
        scope.game = {
          language: 'English',
          dialect: 'Midwest',
          progression: "Hard Midwest",
          variant : ''
        };
        expect(scope.getVariants()).toEqual(variantKeys);
      });


    });


  });

});
