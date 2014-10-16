
angular.module('app').factory('LanguageRepository', function(session, $q, $firebase) {

    var ref = new Firebase("https://languagehuntgamehub.firebaseio.com/languages/");
    //var languages = [];
    //ref.on('value', function(snap) { languages = snap.val(); });


    return {

      save: function() {
      },

      getLanguages: function() {
        var deferred = $q.defer();
        ref.once('value', function(data) {
          var languages = data.val();
          deferred.resolve( languages );
        });
        return deferred.promise;
      }

 };

});
