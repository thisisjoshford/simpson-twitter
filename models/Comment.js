const mongoose = require('mongoose');

module.exports = mongoose.model('Comment', {
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true
  },
  handle: {
    type: String,
    required:true
  },
  text: {
    type: String,
    required: true
  }
});
