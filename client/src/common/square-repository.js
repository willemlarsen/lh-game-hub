angular.module('app').factory('SquareRepository', function() {
  var square = { "question": "question", "answer": "answer"};
 return {

  save: function(form) {
    exchanges = form.exchanges;
   console.log(form);
  },

  getSquare: function() {
    return square;
  }
 };
});
