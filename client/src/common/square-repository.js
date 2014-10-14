angular.module('app').factory('SquareRepository', function() {

 var square = {
  "interactions": [{
    "question": {
      "text": "what is that?"
    },
    "answer": {
      "text": "that is a cup."
    }
  }]
 };


    // UUID generator
    // Snippet from: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    var s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    var guid = function() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

 return {

  save: function(form) {
    square.interactions = form.interactions;
  },

  getSquare: function() {
    return square;
  }
 };
});
