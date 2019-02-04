require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Customer = require('../../lib/models/Customer');
// const { Types, connection } = require('mongoose');


describe('validates customer model', () => {
  it('can create a valid customer', () => {
    const customer = new Customer({
      name: 'lance',
      purchaseHistory: [
        { product: 'cone1', price: 5 },
        { product: 'cone1', price: 5 }
      ]
    });
    expect(customer.toJSON()).toEqual({
      name: 'lance',
      purchaseHistory: [
        { product: 'cone1', price: 5 },
        { product: 'cone1', price: 5 }
      ],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
