require('dotenv').config();
require('../../lib/utils/connect')();
// const mongoose = require('mongoose');
const Purchase = require('../../lib/models/Purchase');
const Store = require('../../lib/models/Store');
const { Types, connection } = require('mongoose');

const createStore = name => {
  return Store.create({
    name,
    products: ['cone', 'milkshake'],
    address: '123 Main St.'
  })
    .then(store => ({ ...store, _id: store._id.toString() }));
};


describe('test purchase model', () => {
  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    connection.close(done);
  });

  it('validates a good purchase model', () => {
    return createStore('Raskin Bobbins')
      .then(store => {
        const purchase = new Purchase({
          product: 'cone',
          price: 5.00,
          store: store._id
        });
        expect(purchase.toJSON()).toEqual({
          product: 'cone',
          price: 5.00,
          store: expect.any(Types.ObjectId),
          _id: expect.any(Types.ObjectId)
        });
      });
  });
});
