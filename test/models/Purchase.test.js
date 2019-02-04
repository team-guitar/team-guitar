require('dotenv').config();
require('../../lib/utils/connect')();
// const mongoose = require('mongoose');
const Purchase = require('../../lib/models/Purchase');
const { Types, connection } = require('mongoose');



describe.skip('test purchase model', () => {
  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    connection.close(done);
  });

  it('validates a good purchase model', () => {
    const purchase = new Purchase({
      product: 'cone',
      price: 5.00
    });
    expect(purchase.toJSON()).toEqual({
      product: 'cone',
      price: 5.00,
      _id: expect.any(Types.ObjectId)
    });
  });
});
