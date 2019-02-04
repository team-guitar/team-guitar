require('dotenv').config();
const mongoose = require('mongoose');
require('../../lib/utils/connect')();
const Store = require('../../lib/models/Store');
const { Types, connection } = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');


describe('test store routes', () => {
  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    connection.close(done);
  });

  it('can post a store to the DB', () => {
    return request(app)
      .post('/store')
    //   .set('Authorization', `Bearer${getToken()}`)
      .send({
        products: ['cone', 'cone2'],
        address: '301 NW 10th Ave' 
      })
      .then(res => {
        expect(res.body).toEqual({
          products: ['cone', 'cone2'],
          address: '301 NW 10th Ave',
          __v: 0,
          _id: expect.any(String) 
        });
      });
  });

});
