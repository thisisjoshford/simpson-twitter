require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const Tweet = require('../lib/Models/tweet');

describe('tweet routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('posts a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({
        handle: '@ronswansonbot',
        text: 'There has never been a sadness that can’t been cured by breakfast food.'
      }
      )
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: '@ronswansonbot',
          text: 'There has never been a sadness that can’t been cured by breakfast food.',
          __v: 0
        });
      });     
  });
});
  
