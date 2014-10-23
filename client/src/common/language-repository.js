
angular.module('app').factory('LanguageRepository', function(session, $q, $firebase) {

  var ref = new Firebase("https://languagehuntgamehub.firebaseio.com/");

  var retrieveChild = function(child) {
    var deferred = $q.defer();
    var languageRef = ref.child(child);
    languageRef.once('value', function(data) {
      deferred.resolve( data.val() );
    });
    return deferred.promise;
  };

  return {

    save: function() {
    },

    getLanguages: function() {
      return retrieveChild('languages');
    },

    getLanguage: function (language) {
      return retrieveChild(language);
    },

    saveLap: function (language) {

    },

    saveSquare: function (square) {
    },

  };

});

