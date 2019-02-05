require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
// const seedData = require('./seedData');
const Purchase = require('../models/Purchase');
const Store = require('../models/Store');
const Customer = require('../models/Customer');
const request = require('supertest');
const User = require('../models/User');
const app = require('../app');

beforeAll(() => {
  connect();
});

beforeEach(done => {
  mongoose.connection.dropDatabase(done);
});

let token;
beforeEach(() => {
  return User.findOne({ username: 'Bill0' })
    .then(user => {
      return request(app)
        .post('/auth/signin')
        .send({ username: user.username, password: 'password' });
    })
    .then(res => {
      token = res.body.token;
    });
});

afterAll(done => {
  mongoose.connection.close(done);
});

const prepare = model => JSON.parse(JSON.stringify(model));
const prepareAll = models => models.map(prepare);

const createGetters = Model => {
  return {
    [`get${Model.modelName}`]: (query = {}) => Model.findOne(query).then(prepare),
    [`get${Model.modelName}s`]: (query = {}) => Model.find(query).then(prepareAll)
  };
};
module.exports = { 
  ...createGetters(User),
  ...createGetters(Purchase),
  ...createGetters(Store),
  ...createGetters(Customer),
  getToken: () => token

};
