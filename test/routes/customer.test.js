require('dotenv').config();
require('../../lib/utils/connect')();
const { connection } = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Customer = require('../../lib/models/Customer');
const Chance = require('chance');
const chance  = new Chance();
const { getToken } = require('../../lib/utils/dataHelper');

const createCustomer = () => {
  return Customer.create({
    name: chance.name()
  })
    .then(customer => customer);
};


describe.only('test customer routes', () => {
  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    connection.close(done);
  });

  it('can post a new customer to the DB', () => {
    return createCustomer()
      .then(customer => {
        return request(app)
          .post('/customer')
          .set('Authorization', `Bearer ${getToken()}`)
          .send(customer);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: expect.any(String),
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can get all customers', () => {
    return createCustomer()
      .then(customer => {
        return request(app)
          .post('/customer')
          .set('Authorization', `Bearer ${getToken()}`)
          .send(customer);
      })
      .then(() => {
        return request(app)
          .get('/customer')
          .set('Authorization', `Bearer ${getToken()}`);
      })
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });
  it('can get a customer by their id', () => {
    return createCustomer()
      .then(customer => {
        return request(app)
          .post('/customer')
          .set('Authorization', `Bearer ${getToken()}`)
          .send(customer)
          .then(postedCustomer => {
            const id = postedCustomer.body._id;
            return request(app)
              .get(`/customer/${id}`)
              .then(res => {
                expect(res.body.name).toEqual(postedCustomer.body.name);
              });
          });
      });
  });
  it('can update a customer', () => {
    return createCustomer()
      .then(createdCustomer => {
        return request(app)
          .post('/customer')
          .set('Authorization', `Bearer ${getToken()}`)
          .send(createdCustomer);
      })
      .then(customer => {
        return request(app)
          .patch(`/customer/${customer.body._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .send({ name: 'Bill' });
      })
      .then(res => {
        expect(res.body.name).toEqual('Bill');
      });
  });
  it('can delete a customer by id', () => {
    return createCustomer()
      .then(createdCustomer => {
        return request(app)
          .post('/customer')
          .set('Authorization', `Bearer ${getToken()}`)
          .send(createdCustomer);
      })
      .then(customer => {
        return request(app)
          .delete(`/customer/${customer.body._id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body).toEqual(customer.body);
          });
      });
  });
});
