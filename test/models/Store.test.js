require('dotenv').config();
require('../../lib/utils/connect')();
// const mongoose = require('mongoose');
const Store = require('../../lib/models/Store');
const { Types, connection } = require('mongoose');

describe('test store model', () => {
  beforeEach(done => {
    return connection.dropDatabase(() => {
      done();
    });
  });
  afterAll((done) => {
    connection.close(done);
  });

  it('can validate a Store model', () => {
    const store = new Store({
      products: ['cone', 'cone2'],
      address: '301 NW 10th Ave'
    });
    expect(store.toJSON()).toEqual({
      products: ['cone', 'cone2'],
      address: '301 NW 10th Ave',
      _id: expect.any(Types.ObjectId)
    });
  });
});
