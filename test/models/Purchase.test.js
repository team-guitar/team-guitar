require('dotenv').config();
require('../../lib/utils/connect')();
const Purchase = require('../../lib/models/Purchase');
const Store = require('../../lib/models/Store');
const Customer = require('../../lib/models/Customer');
const { Types, connection } = require('mongoose');
const Chance = require('chance');
const chance  = new Chance();

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
    return Promise.all([
      createCustomer(),
      createStore('Raskin Bobbins')
    ])
      .then(([customer, store]) => {
        const purchase  = new Purchase({
          product: 'cone',
          price: 5.00,
          store: store._id,
          customer: customer._id
        });
        expect(purchase.toJSON()).toEqual({
          product: 'cone',
          price: 5.00,
          store: expect.any(Types.ObjectId),
          customer: expect.any(Types.ObjectId),
          _id: expect.any(Types.ObjectId)
        });
      });
  });
});
