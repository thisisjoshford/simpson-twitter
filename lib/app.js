const express = require('express');
const app = express();

app.use(express.json());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/tweets', require('../routes/tweets.js'));
app.use('/api/v1/comments', require('./routes/comment.js'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
