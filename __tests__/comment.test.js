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

  it('gets a comment by id', async() => {
    const tweet = await Tweet.create({
      handle: '@ronswansonbot',
      text: 'There has never been a sadness that can’t been cured by breakfast food.'
    });

    const comment = await Comment
      .create({
        tweetId: tweet._id,
        handle: '@ronswansonbotfollower',
        text: 'killer tweet!'
      });

    return request(app)
      .get(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tweetId: {
            ...tweet.toJSON(),
            _id: tweet.id
          },
          handle: '@ronswansonbotfollower',
          text: 'killer tweet!',
          __v: 0
        });
      });
  });

  it('update a comment by id', async() => {
    const tweet = await Tweet.create({
      handle: '@ronswansonbot',
      text: 'There has never been a sadness that can’t been cured by breakfast food.'
    });

    const comment = await Comment
      .create({
        tweetId: tweet._id,
        handle: '@ronswansonbotfollower',
        text: 'killer tweet!'
      });

    return request(app)
      .patch(`/api/v1/comments/${comment._id}`)
      .send({ text: 'horrible tweet!'})
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tweetId: tweet.id,
          handle: '@ronswansonbotfollower',
          text: 'horrible tweet!',
          __v: 0
        });
      });
  });

  it('deletes a comment by id', async() => {
    const tweet = await Tweet.create({
      handle: '@ronswansonbot',
      text: 'There has never been a sadness that can’t been cured by breakfast food.'
    });
    const comment = await Comment
      .create({
        tweetId: tweet._id,
        handle: '@ronswansonbotfollower',
        text: 'killer tweet!'
      });

    return request(app)
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tweetId: tweet.id,
          handle: '@ronswansonbotfollower',
          text: 'killer tweet!',
          __v: 0
        });
      });     
  });
});
