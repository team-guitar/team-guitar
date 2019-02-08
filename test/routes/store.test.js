require('dotenv').config();
require('../../lib/utils/connect')();
const { connection } = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const { getToken } = require('../../lib/utils/dataHelper');




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
      .set('Authorization', `Bearer ${getToken()}`)
      .send({
        flavors: ['cone', 'cone2'],
        sizes: ['single-scoop', 'double-scoop'],
        address: '301 NW 10th Ave',
        name: 'Raskin Bobbins'
      })
      .then(res => {
        expect(res.body).toEqual({
          flavors: ['cone', 'cone2'],
          sizes: ['single-scoop', 'double-scoop'],
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
      .set('Authorization', `Bearer ${getToken()}`)
      .send({
        flavors: ['cone', 'cone2'],
        sizes: ['single-scoop', 'double-scoop'],
        address: '301 NW 10th Ave',
        name: 'Raskin Bobbins'
      })
      .then(() =>{
        return request(app)
          .get('/store')
          .set('Authorization', `Bearer ${getToken()}`);
      })
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });
  it('can get all stores in DB by QUERY', () => {
    return request(app)
      .post('/store')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({
        flavors: ['cone', 'cone2'],
        sizes: ['single-scoop', 'double-scoop'],
        address: 'Portland, OR',
        name: 'Raskin Bobbins'
      })
      .then(() =>{
        return request(app)
          .get('/store/?city=Portland%2C+OR')
          .set('Authorization', `Bearer ${getToken()}`);
      })
      .then(res => {
        expect(res.text).toContain('Portland');
      });
  });
  it('can get a store by id', () => {
    return request(app)
      .post('/store')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({
        flavors: ['cone', 'cone2'],
        sizes: ['single-scoop', 'double-scoop'],
        address: '301 NW 10th Ave',
        name: 'Raskin Bobbins'
      })
      .then(postedStore => {
        const id = postedStore.body._id;
        return request(app)
          .get(`/store/${id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body._id).toEqual(postedStore.body._id);
          });
      });
  });
  it('can update a store', () => {
    return request(app)
      .post('/store')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({
        flavors: ['cone', 'cone2'],
        sizes: ['single-scoop', 'double-scoop'],
        address: '301 NW 10th Ave',
        name: 'Raskin Bobbins'
      })
      .then(store => {
        return request(app)
          .patch(`/store/${store.body._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .send({
            flavors: ['cone', 'cone2'],
            sizes: ['single-scoop', 'double-scoop'],
            address: '30100 NW 10th Ave',
            name: 'Raskin Bobbins'
          })
          .then(res => {
            expect(res.body.address).toEqual('30100 NW 10th Ave');
          });
      });
  });
  it('can delete a store by id', () => {
    return request(app)
      .post('/store')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({
        flavors: ['cone', 'cone2'],
        sizes: ['single-scoop', 'double-scoop'],
        address: '30100 NW 10th Ave',
        name: 'Raskin Bobbins'
      })
      .then(store => {
        return request(app)
          .delete(`/store/${store.body._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body).toEqual(store.body);
          });
      });
  });
});

