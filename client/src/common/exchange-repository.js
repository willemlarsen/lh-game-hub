angular.module('app').factory('ExchangeRepository', function() {
  var exchanges = { "question": "question", "answer": "answer"};
 return {

  save: function(form) {
    exchanges = form.exchanges;
   console.log(form);
  },

  getExchanges: function() {
    return exchanges;
  }
 };
});
