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
 return {

  save: function(form) {
    square = form.square;
  },

  getSquare: function() {
    return square;
  }
 };
});
