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
const { getToken } = require('../../lib/utils/dataHelper');

const createStore = name => {
  return Store.create({
    name,
    flavors: ['cone', 'milkshake'],
    sizes:['kids', 'single-scoop', 'double-scoop', 'pint'],
    address: '123 Main St.'
  })
    .then(store => ({ ...store, _id: store._id.toString() }));
};

const createCustomer = () => {
  return Customer.create({
    name: chance.name(),
    phone:chance.phone()
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
        flavor: chance.pickone(createdStore._doc.flavors),
        size: chance.pickone(createdStore._doc.sizes),
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
          .set('Authorization', `Bearer ${getToken()}`)
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
          .set('Authorization', `Bearer ${getToken()}`)
          .send(purchase);
      })
      .then(postedPurchase => {
        const _id = postedPurchase.request._data._id;
        return request(app)
          .get(`/purchase/${_id}`)
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body._id).toEqual(postedPurchase.request._data._id);
          });
      });
  });
  it('can get all purchases', () => {
    return createPurchase()
      .then(purchase => {
        return request(app)
          .post('/purchase')
          .set('Authorization', `Bearer ${getToken()}`)
          .send(purchase);
      })
      .then(() => {
        return request(app)
          .get('/purchase')
          .set('Authorization', `Bearer ${getToken()}`);
      })
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });
  it('can test revPerStore route', () => {
    return createPurchase()
      .then(purchase => {
        return request(app)
          .post('/purchase')
          .set('Authorization', `Bearer ${getToken()}`)
          .send(purchase);
      })
      .then(() => {
        return request(app)
          .get('/purchase/stats/revPerStore')
          .set('Authorization', `Bearer ${getToken()}`);
      })
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });
  it('can test topSpendingCustomers', () => {
    return createPurchase()
      .then(purchase => {
        return request(app)
          .post('/purchase')
          .set('Authorization', `Bearer ${getToken()}`)
          .send(purchase);
      })
      .then(() => {
        return request(app)
          .get('/purchase/stats/topSpendingCustomers')
          .set('Authorization', `Bearer ${getToken()}`);
      })
      .then(res => {
        expect(res.body[0]).toEqual(expect.any(Object));
      });
  });
});





