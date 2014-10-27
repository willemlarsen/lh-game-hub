angular.module('app').factory('GameRepository', function(session, $q, $firebase) {

  var ref = new Firebase("https://languagehuntgamehub.firebaseio.com/");
  var sync = $firebase(ref);

  var retrieveChild = function(child) {
    var deferred = $q.defer();
    var languageRef = ref.child(child);
    languageRef.once('value', function(data) {
      deferred.resolve(data.val());
    });
    return deferred.promise;
  };

  return {

    getLanguages: function() {
      return retrieveChild('languages');
    },

    getLanguage: function(language) {
      return retrieveChild(language);
    },

    saveLap: function(language) {},

    saveSquare: function(squareId, square) {
      // saveSquareToLap(squareId);
      squareRef = ref.child(squareId);
      squareRef.set(angular.copy(square));
    },
    // saveSquareToLap: function(squareId, lapId) {
    //   var language = session.language;
    //   lapIdRef = ref.child('language').child(lapId);
    //   lapIdRef.child('squares').push(squareId);
    // },

    createGuid: function() {
      var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

  };

});
