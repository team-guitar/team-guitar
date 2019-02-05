require('dotenv').config();
// const mongoose = require('mongoose');
require('../../lib/utils/connect')();
const { connection } = require('mongoose');
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
      // .set('Authorization', `Bearer${getToken()}`)
      .send({
        products: ['cone', 'cone2'],
        address: '301 NW 10th Ave',
        name: 'Raskin Bobbins'
      })
      .then(res => {
        expect(res.body).toEqual({
          products: ['cone', 'cone2'],
          address: '301 NW 10th Ave',
          name: 'Raskin Bobbins',
          __v: 0,
          _id: expect.any(String) 
        });
      });
  });
  it('can get all stores in DB', () => {
    return request(app)
      .post('/store')
      // .set('Authorization', `Bearer${getToken()}`)
      .send({
        products: ['cone', 'cone2'],
        address: '301 NW 10th Ave',
        name: 'Raskin Bobbins'
      })
      .then(() =>{
        return request(app)
          .get('/store');
      })
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });
  it('can get a store by id', () => {
    return request(app)
      .post('/store')
    // .set('Authorization', `Bearer${getToken()}`)
      .send({
        products: ['cone', 'cone2'],
        address: '301 NW 10th Ave',
        name: 'Raskin Bobbins'
      })
      .then(postedStore => {
        const id = postedStore.body._id;
        return request(app)
          .get(`/store/${id}`)
          .then(res => {
            expect(res.body._id).toEqual(postedStore.body._id);
          });
      });
  });
});
