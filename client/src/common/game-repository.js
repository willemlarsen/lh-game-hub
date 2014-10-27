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
    var language = session.getGame().language;
    lapIdRef = ref.child(session.getGame().language).child(lapId);
    lapIdRef.child('squares').push(squareId);
  };

  return {

    getLanguages: function() {
      return retrieveChild('languages');
    },

    getLanguage: function(language) {
      return retrieveChild(language);
    },

    saveLap: function(language) {},

    saveSquare: function(squareId, square, lapId) {
      saveSquareToLap(squareId, lapId);
      squareRef = ref.child(squareId);
      squareRef.set(angular.copy(square));
    },

    createGuid: function() {
      var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

  };

});
