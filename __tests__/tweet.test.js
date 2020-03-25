require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../models/Tweet');

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

  it('gets all the tweets', () => {
    const tweets = [{
      handle: '@ronswansonbot',
      text: 'There has never been a sadness that can’t been cured by breakfast food.'
    },
    {
      handle: '@ronswansonbot',
      text: 'Clear alcohols are for rich women on diets.'
    }];

    return Tweet
      .create(tweets)
      .then(() => {
        return request(app)
          .get('/api/v1/tweets');
      })
      .then(res => {
        tweets.forEach(tweet => {
          expect(res.body).toContainEqual(
            { _id: expect.any(String),
              ...tweet,
              __v: 0 
            }
          );
        });
      });
  });    
  
  it('gets a tweet by ID', async() => {
    const tweet = await Tweet
      .create({
        handle: '@ronswansonbot',
        text: 'There has never been a sadness that can’t been cured by breakfast food.'
      });
    return request(app)
      .get(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        expect(res.body).toEqual(
          { _id: res.body._id,
            handle: '@ronswansonbot',
            text: 'There has never been a sadness that can’t been cured by breakfast food.',
            __v: 0 
          }
        );
      });
  });

  it('updates a tweet by id', () => {
    return Tweet
      .create({
        handle: '@ronswansonbot',
        text: 'There has never been a sadness that can’t been cured by breakfast food.'
      })
      .then(tweet => {
        return request(app)
          .patch(`/api/v1/tweets/${tweet._id}`)
          .send({ text: 'There has never been a sadness that can’t been cured by FOOD.' });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: '@ronswansonbot',
          text: 'There has never been a sadness that can’t been cured by FOOD.',
          __v: 0
        });
      });
  });

  it('deletes a tweet by id', () => {
    return Tweet
      .create({
        handle: '@ronswansonbot',
        text: 'There has never been a sadness that can’t been cured by breakfast food.'
      })
      .then(tweet => {
        return request(app)
          .delete(`/api/v1/tweets/${tweet._id}`);
      })
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


  
