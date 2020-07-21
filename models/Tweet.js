const mongoose = require('mongoose');
const getQuote = require('../services/getQuote');

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

tweetSchema.pre('validate', function(next) {
  if(this.text) return next();

  getQuote()
    .then(quote => this.text = quote)
    .then(() => next());
});

module.exports = mongoose.model('Tweet', tweetSchema);
