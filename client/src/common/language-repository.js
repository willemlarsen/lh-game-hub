
angular.module('app').factory('LanguageRepository', function(session) {



 return {

  save: function() {
  },

  getLanguages: function() {
   var ref = new Firebase("https://languagehuntgamehub.firebaseio.com/languages");
   var sync = $firebase(ref);

   var languages = sync.$asArray();
   return languages;
  }

 };

});
