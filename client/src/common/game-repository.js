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
      var objectToSave = {
        "type": square.type,
        "props": square.props,
      };
      objectToSave.interactions = _.map(square.interactions, function(item) {
        return {
          "question": {
            "text": item.question.text,
            "audiofile": item.question.audiofile },
          "answer": {
            "text": item.answer.text,
            "audiofile": item.answer.audiofile }
        };
      });

      squareRef = ref.child(squareId);
      squareRef.set(objectToSave);
    },

    createGuid: function() {
      var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

  };

});
