angular.module('app').factory('GameRepository', function(session, $q) {

  var ref = new Firebase("https://languagehuntgamehub.firebaseio.com/");

  var retrieveChild = function(child) {
    var deferred = $q.defer();
    var languageRef = ref.child(child);
    languageRef.once('value', function(data) {
      deferred.resolve(data.val());
    });
    return deferred.promise;
  };

  var saveSquareToLap = function(squareId, lapId) {
    var lapIdRef = ref.child(session.getGame().language).child(lapId);
    var squaresRef = lapIdRef.child('squares');
    squaresRef.once('value', function(item) {
      var list = item.val() || [];
      list.push(squareId);
      squaresRef.set(list);
    });

  };

  return {

    getLanguages: function() {
      return retrieveChild('languages');
    },

    getLanguage: function(language) {
      return retrieveChild(language);
    },

    saveLap: function(lapId, lap) {
      var language = session.getGame().language;
      var lapRef = ref.child(language).child(lapId);
      lapRef.set(angular.copy(lap));
    },

    saveSquare: function(squareId, square, lapId) {
      saveSquareToLap(squareId, lapId);
      var squareRef = ref.child(squareId);
      squareRef.set(angular.copy(square));
    },

    createGuid: function(_prefix) {
      var prefix = _prefix || "";
      var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };
      return prefix + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

  };

});
