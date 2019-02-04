require('dotenv').config();
require('../../lib/utils/connect')();
// const { connection } = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const Store = require('../../lib/models/Store');
const Purchase = require('../../lib/models/Purchase');
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
const createPurchase = () => {
  return createStore('Raskin Bobbins')
    .then(createdStore => {
      return Purchase.create({
        product: chance.pickone(createdStore._doc.products),
        price: chance.integer({ min: 1, max: 12 }),
        store: createdStore._doc._id
      })
        .then(purchase => ({ ...purchase._doc, _id: purchase._doc._id.toString() })
        );
    });
};
describe('purchase routes test', () => {
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
});





