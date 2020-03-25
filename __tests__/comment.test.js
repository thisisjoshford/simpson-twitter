require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../models/Tweet');
const Comment = require('../models/Comment');

describe('comment routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a comment', () => {
    return request(app)
      .post('/api/v1/comments')
      .send({
        tweetId: new mongoose.Types.ObjectId(),
        handle: '@ronswansonbotfollower',
        text: 'this was an awesome tweet'
      }
      )
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tweetId: expect.any(String),
          handle: '@ronswansonbotfollower',
          text: 'this was an awesome tweet',
          __v: 0
        });
      });     
  });

});


  
