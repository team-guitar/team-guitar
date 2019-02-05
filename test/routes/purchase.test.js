require('dotenv').config();
require('../../lib/utils/connect')();
const { connection } = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Store = require('../../lib/models/Store');
const Purchase = require('../../lib/models/Purchase');
const Customer = require('../../lib/models/Customer');
const Chance = require('chance');
const chance = new Chance();

const createStore = name => {
  return Store.create({
    name,
    products: ['cone', 'milkshake'],
    address: '123 Main St.'
  })
    .then(store => ({ ...store, _id: store._id.toString() }));
};

const createCustomer = () => {
  return Customer.create({
    name: chance.name()
  })
    .then(customer => customer);
};

const createPurchase = () => {
  return Promise.all([
    createCustomer(),
    createStore('Raskin Bobbins')
  ])
    .then(([createdCustomer, createdStore]) => {
      return Purchase.create({
        product: chance.pickone(createdStore._doc.products),
        price: chance.integer({ min: 1, max: 12 }),
        store: createdStore._doc._id,
        customer: createdCustomer._doc._id
      })
        .then(purchase => ({ ...purchase._doc, _id: purchase._doc._id.toString() })
        );
    });
};

describe('purchase routes test', () => {
  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    connection.close(done);
  });

  it('can create a purchase', () => {
    return createPurchase()
      .then(purchase => {
        return request(app)
          .post('/purchase')
          .send(purchase);
      })
      .then(res => {
        expect(res.body).toEqual(expect.any(Object));
      });
  });
  it('can get a purchase by id', () => {
    return createPurchase()
      .then(purchase => {
        return request(app)
          .post('/purchase')
          .send(purchase);
      })
      .then(postedPurchase => {
        const _id = postedPurchase.request._data._id;
        return request(app)
          .get(`/purchase/${_id}`)
          .then(res => {
            expect(res.body._id).toEqual(postedPurchase.request._data._id);
          });
      });
  });
});





