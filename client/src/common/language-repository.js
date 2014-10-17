
angular.module('app').factory('LanguageRepository', function(session, $q, $firebase) {

    var ref = new Firebase("https://languagehuntgamehub.firebaseio.com/");

    return {

      save: function() {
      },

      getLanguages: function() {
        var deferred = $q.defer();
        var languageRef = ref.child('languages');
        languageRef.once('value', function(data) {
          var languages = data.val();
          deferred.resolve( languages );
        });
        return deferred.promise;
      },

      getLanguage: function (language) {
        var deferred = $q.defer();
        var languageRef = ref.child(language);
        ref.once('value', function(data) {
          var language = data.val();
        });
        return deferred.promise;
      }

 };

});

