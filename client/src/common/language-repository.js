
angular.module('app').factory('LanguageRepository', function(session, $firebase) {

    var ref = new Firebase("https://languagehuntgamehub.firebaseio.com/languages/");


 return {

  save: function() {
  },

  getLanguages: function() {
    var sync = $firebase(ref);
    var languages = sync.$asObject();
    return languages;
  }

 };

});
