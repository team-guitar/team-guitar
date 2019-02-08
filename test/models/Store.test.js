
require('dotenv').config();
require('../../lib/utils/connect')();
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
      flavors: ['raisin granola carnitas', 'root beer rhudabega'],
      sizes: ['single-scoop', 'double-scoop'],
      address: '301 NW 10th Ave',
      name: 'Raskin Bobbins'
    });
    expect(store.toJSON()).toEqual({
      flavors: ['raisin granola carnitas', 'root beer rhudabega'],
      sizes: ['single-scoop', 'double-scoop'],
      address: '301 NW 10th Ave',
      name: 'Raskin Bobbins',
      _id: expect.any(Types.ObjectId)
    });
  });
});
